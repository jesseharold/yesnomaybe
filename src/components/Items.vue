<template>
  <section id="items" :class="compareMode ? 'compare-mode' : ''">
    <h3 v-if="compareMode" class="hide-print">Show only items that have this level of interest or higher:</h3>
    <Slider
        v-if="compareMode"
        class="hide-print"
        name="compareThreshold"
        :readonly="false"
        :value="`${compareThreshold}`"
        @change="(e) => setCompareThreshold(e.target.value)" />

    <!-- labels row -->
    <div class="row columns column-labels">
        <div class="column activity">
            <button class="toggle-button hide-print" @click="openAllCategories">Open all</button>
            <button class="toggle-button hide-print" @click="closeAllCategories">Close all</button></div>
        <div class="column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
            <button 
                v-if="column.id === 'experience'" 
                title="Delete this Column" 
                class="remove-button hide-print" 
                @click="removeExperienceColumn()">X</button>
            <button 
                v-if="column.id !== 'experience' && column.id !== 'notes'" 
                title="Rename this Column" 
                class="remove-button rename-button hide-print" 
                @click="renameColumn(column.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 25 25"><path fill="#aaa" d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
            </button>
            {{ column.label }}
        </div>
    </div>
    <div 
        v-for="category in categorizedItems" 
        v-bind:key="getName(category)" 
        class="category-container" 
        :class="getVis(category) ? '' : 'collapsed'">
        <!-- categories -->
        <h2 class="category-title" @click="toggleCategory(getName(category))">{{ getName(category) }}
            <button class="category-toggle hide-print" title="Expand/Close this Category" :name="getVis(category) ? 'close' : 'open'">
                {{ getVis(category) ? '^' : 'V'}}
            </button>
        </h2>
        <!-- item rows -->
        <div class="row columns" :class="filteredOut(item.id) ? 'hidden' : ''" v-for="item in category" v-bind:key="item.id">
            <div class="item column activity">
                <button class="remove-button hide-print" title="Delete this Row" @click="removeItem(item.id)">X</button>
                {{ item.label }}
            </div>
            <div class="item column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
                <Slider 
                    v-if="!column.inputType" 
                    :name="item.id + '_' + column.id"
                    :value="parseInt(item[column.id])"
                    :readonly="compareMode"
                    @change="(e) => setValue(item.id, column.id, e.target.value)" />
                <Editor
                    v-if="column.inputType === 'text'" 
                    class="notes-field"
                    :ref="`notes-${item.id}`"
                    :name="item.id + '_' + column.id"
                    initial-value=""
                    :inline="true"
                    v-model="item.notes"
                    :disabled="compareMode"
                    :init="{
                        menubar: false,
                        plugins: [],
                        toolbar: ''
                    }" 
                />
            </div>
        </div>
        <!-- add new item to this category -->
        <div class="add-custom hide-print row columns">
            <input type="text" class="column" maxlength="40" v-model="newCustomName">
            <button class="new-item column" @click="addItem(newCustomName, getName(category))">Add item to {{ getName(category) }}</button>
        </div>
    </div>
    <!-- add new category -->
    <div class="add-custom add-custom-category hide-print row columns">
        <input type="text" class="column" maxlength="40" v-model="newCategoryName">
        <button class="new-item new-category column" @click="addCategory(newCategoryName)">Add new category</button>
    </div>
    <div class="control-panel hide-print">
        <a 
            :href="textFile" 
            :download="'ynm-' + new Date().getTime() + '.txt'" 
            class="save-button"
            @click="getDataString" >
                Download to file
        </a>
    </div>
    <div class="control-panel hide-print">
        <textarea
            v-model="loadJsonText"
            id="loadFromJson" 
            name="loadFromJson"
            cols="100" rows="4" 
            placeholder="open your ynm.txt file in a *plain text editor* and paste it here" />
        <button class="load-button" :class="canLoad ? 'enabled' : 'disabled'" @click="loadJson">
            Load saved from file
        </button>
        <button class="load-button" :class="canLoad ? 'enabled' : 'disabled'" @click="loadJsonAndCompare">
            Load saved and compare to current values
        </button>
    </div>
  </section>
</template>

<script>
import itemData from '../json/items.json'
import columnData from '../json/columns.json'
import util from '../util/util'
import Slider from '../components/Slider'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'Items',
  components: {
    Slider,
    Editor
  },
  data() {
    return {
        rawItems: itemData.items,
        categoryOpen: [],
        columns: columnData.columns,
        newCustomName: '',
        newCategoryName: '',
        loadJsonText: '',
        textFile: null,
        compareMode: false,
        compareThreshold: 0
    }
  },
  computed: {
    items() {
        return util.alphabetize(this.rawItems, 'category')
    },
    categorizedItems() {
        // make categories the top level key
       const categorized = this.items.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
        }, Object.create(null));
        
        // alphabetize items within each category
        const categorizedAndSorted = {}
        for (const cat in categorized) {
            if (Object.hasOwnProperty.call(categorized, cat)) {
                categorizedAndSorted[cat] = util.alphabetize(categorized[cat], 'label')
            }
        }
        return categorizedAndSorted
    },
    canLoad() {
        return this.loadJsonText && this.loadJsonText.length > 0
    }
  },
  mounted() {
      this.categoryOpen = this.setInitialCategoryVis()
  },
  methods: {
        setInitialCategoryVis() {
            const uniqueCategoryNames = Object.keys(this.categorizedItems)
            const sortedCategories =  util.alphabetize(uniqueCategoryNames)
            return sortedCategories.reduce(function(o, val) { o[val] = false; return o; }, {})
        },
        closeAllCategories() {
            for (const cat in this.categoryOpen) {
                this.categoryOpen[cat] = false
            }
        },
        openAllCategories() {
            for (const cat in this.categoryOpen) {
                this.categoryOpen[cat] = true
            }
        },
        toggleCategory(categoryName) {
            // clear any abandoned custom item
            this.newCustomName = ''
            this.categoryOpen[categoryName] = !this.categoryOpen[categoryName]
        },
        getName(cat) {
            return cat[0].category
        },
        getVis(cat) {
            return this.categoryOpen[cat[0].category]
        },
        setValue(id, column, value) {
            const item = this.items.filter(itm => itm.id === id)[0]
            item[column] = value
        },
        setCompareThreshold(value) {
            this.compareThreshold = value
        },
        addItem(name, categoryName) {
            this.newCustomName = ''
            if (!this.categoryOpen[categoryName] && this.categoryOpen[categoryName] !== false) {
                this.addCategory(categoryName)
            }
            const newItem = {
                id: "custom-" + util.slugify(name),
                category: categoryName,
                label: name
            }
            this.items.push(newItem)
        },
        addCategory(name) {
            this.newCategoryName = ''
            this.categoryOpen[name] = true
            this.addItem(name, name)
        },
        removeItem(itemid) {
            for( var i = 0; i < this.items.length; i++){                    
                if ( this.items[i].id === itemid) { 
                    this.items.splice(i, 1); 
                    i--; 
                }
            }
        },
        removeExperienceColumn(){
            this.columns = this.columns.filter(col => col.id !== 'experience')
        },
        renameColumn(colId) {
            const thisCol = this.columns.filter(col => col.id === colId)[0]
            const input = prompt("Rename '" + colId + "' column to:")
            thisCol.label = input
        },
        getDataString(e) {
            e.stopPropagation()
            // stringify and obscure current data
            const dataToSave = { items: this.items, columns: this.columns }
            const unreadableData = util.obfuscate(JSON.stringify(dataToSave))
            // create text blob
            const data = new Blob([unreadableData], {type: 'text/plain'});
            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (this.textFile !== null) {
                window.URL.revokeObjectURL(this.textFile);
            }
            // generate text file
            // returns a URL you can use as a href
            this.textFile = window.URL.createObjectURL(data);
        },
        loadJson() {
            if (!this.canLoad) {
                return
            }
            const savedData = JSON.parse(util.deobfuscate(this.loadJsonText))
            if (savedData.items) {
                this.rawItems = savedData.items
                this.columns = savedData.columns
            } else {
                // backwards-compatible from before there was columns in saved data
                this.rawItems = savedData
            }
            this.loadJsonText = ''
            this.openAllCategories()
            document.getElementById('items').scrollIntoView()
        },
        loadJsonAndCompare() {
            if (!this.canLoad) {
                return
            }
            const savedData = JSON.parse(util.deobfuscate(this.loadJsonText))
            if (savedData.items) {
                // ignore custom columns on second sheet, use first one
                this.loadJsonText = ''
                this.compareTwo(savedData.items)
                this.openAllCategories()
                document.getElementById('items').scrollIntoView()
            }
        },
        compareTwo(compareToItems) {
            this.compareMode = true;
            const overlapItems = []
            this.rawItems.forEach(item => {
                // look up each item in second uploaded data set
                const p2item = compareToItems.filter(itm => itm.id === item.id)[0]
                // skip any items that aren't in both lists for any reason
                if (p2item) {
                    const overlap = {
                        id: item.id,
                        label: item.label,
                        category: item.category,
                        // use the lower of the two compared values
                        giving: Math.min(parseInt(item.receiving), parseInt(p2item.giving)),
                        receiving: Math.min(parseInt(item.giving), parseInt(p2item.receiving)),
                        p1notes: item.notes,
                        p2rnotes: p2item.notes
                    }
                    // create new data set with the overlaps
                    overlapItems.push(overlap)
                }
            });
            // prompt for name/initial to use for two people
            const p1Name = prompt("Name / initial for first person entered/uploaded")
            const p2Name = prompt("Name / initial for person uploaded second")

            // rename columns
            this.columns.filter(col => col.id === 'giving')[0].label = p1Name + " receiving"
            this.columns.filter(col => col.id === 'receiving')[0].label = p2Name + " receiving"
            this.columns.filter(col => col.id === 'notes')[0].label = p1Name + " notes"
            this.columns.push({id: "notes2", label: p2Name + " notes", inputType: "text"})
            this.removeExperienceColumn()

            // copy overlapItems into main data
            this.rawItems = overlapItems

            // tweak display for overlap items
            
        },
        filteredOut(itemId) {
            // returns true if we're currently comparing two sheets, 
            // and if *both* people have a lower interest level in this item 
            // than the set threshold filter
            if (!this.compareMode || this.compareThreshold === -1) {
                return false;
            }
            const row = this.items.filter(itm => itm.id === itemId)[0]
            return (row.giving || 0) < this.compareThreshold && (row.receiving || 0) < this.compareThreshold
        }
  },
}
</script>

<style scoped>
/* rows */
#items {
    max-width: 1024px;
    margin: 30px auto;
}
.row {
    padding: 10px;
    position: relative;
}
.row.hidden {
    display: none;
}
.row:nth-child(even) {
    background: rgb(221, 255, 254);
} 
.row:nth-child(odd) {
    background-color: rgb(252 253 244);
}
.row.column-labels {
    position: sticky;
    z-index: 100;
    top: 0;
    align-items: center;
    background-color: white;
}

/* notes column */
.notes-field {
    color: #666;
    background-color: #f8ffff;
    border: 1px dashed #999;
    text-align: left;
    margin: 0;
    padding: 0 5px;
    font-size: 14px;
    min-height: 37px;
}
.notes-field p {
    margin: 0;
}

.column-labels .remove-button {
    right: -5px;
    left: unset;
    top: -10px;
    display: none;
}
.column-labels .column:hover .remove-button {
    display: block;
}
.column-labels .remove-button.rename-button {
    border: 0;
}

.remove-button {
    position: absolute;
    cursor: pointer;
    background-color: transparent;
    color: #999;
    left: -10px;
    top: -10px;
    font-size: 10px;
    border: 1px solid #bbb;
    padding: 2px 3px;
}
.remove-button:hover {
    background-color: #666;
    color: #ccc;
}
@media screen and (max-width:800px) {
    .remove-button{
        top: -20px;
    }
}

/* categories */
.category-container {
    margin-bottom: 40px;
}
.category-title {
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    width: fit-content;
}
.collapsed .category-title {
    color: #999;
}
.category-toggle {
    cursor: pointer;
    background-color: #eee;
    margin: 5px 20px;
    border: 0;
    color: #444;
}
.category-toggle:hover {
    background-color: #ddd;
    color: #222;
}
.category-container.collapsed .row {
    display: none;
}

/* columns */
.columns {
    display: flex;
    justify-content: space-evenly;
}
.column {
    position: relative;
    flex-basis: 10%;
    flex-grow: 1;
    padding: 0 5px;
}
.column.activity {
    flex-basis: 25%;
    max-width: 200px;
}
.column.notes {
    flex-basis: 35%;
}
@media screen and (max-width:800px) {
    .columns {
        flex-wrap: wrap;
    }
    .column.activity, .column.notes {
        max-width: unset;
        flex-basis: 100%;
        margin: 10px 0;
    }
}
.column-labels {
    font-weight: bold;
}
.row.column-labels .activity {
    text-align: left;
    padding-left: 0;
    margin-left: -10px;
    margin-right: 10px;
}

/* add new item forms */
.collapsed button.new-item {
    display: none;
}
.add-custom.add-custom-category {
    background-color: #565b96;
} 
.add-custom input {
    flex-basis: 65%;
    height: 30px;
    margin-top: 30px;
}
@media screen and (max-width:800px) {
    .add-custom input {
        flex-basis: 100%;
    }
}
.add-custom button {
    width: 100%;
    max-width: 300px;
    margin: 30px 10px;
    padding: 10px;
    background-color: #fdd5ff;
}
.add-custom button:hover {
    background-color: #f999ff;
}
.compare-mode .add-custom {
    /* hide add custom buttons in compare mode */
    display: none;
}
.compare-mode .control-panel {
    /* hide upload/download buttons in compare mode */
    display: none;
}

.control-panel {
    margin-top: 100px;
}
.control-panel + .control-panel {
    margin-top: 0;
}
.save-button, .load-button, .toggle-button {
    display: inline-block;
    margin: 20px auto;
    padding: 10px;
    background-color: cornflowerblue;
    border: 0;
    color: white;
    font-weight: bold;
    font-size: large;
    text-decoration: none;
    cursor: pointer;
}

.save-button:hover, .load-button:not(.disabled):hover, .toggle-button:hover {
    opacity: .7;
}
.toggle-button {
    display: inline;
    margin: 5px;
    padding: 5px;
    font-weight: 400;
    font-size: 14px;
}
.control-panel .load-button {
    display: block;
    margin: 5px auto;
}
.control-panel .load-button.disabled {
    background-color: #aaa;
    cursor: auto;
}
#loadFromJson {
    margin-top: 30px;
    max-width: 100%;
}

/* print styles */
@media print {
    .hide-print {
        display: none !important;
    }
    .collapsed .category-title {
        display: none;
    }
    .category-title {
        width: 100%;
        justify-content: center;
        border: 1px solid #000;
        padding: 10px 0;
        break-inside: avoid;
    }
    .category-container > .row {
        border-bottom: 2px solid #999;
        break-inside: avoid;
    }
    .row.column-labels {
        position: relative;
    }
    .notes-field {
        border: 0;
    }
    .notes-field:empty::before {
        content: '';
    }
}
</style>
