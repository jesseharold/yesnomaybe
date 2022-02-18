<template>
  <section id="items">
      <!-- labels row -->
    <div class="row columns column-labels">
        <div class="column activity"></div>
        <div class="column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
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
            <button class="category-toggle hide-print" :name="getVis(category) ? 'close' : 'open'">
                {{ getVis(category) ? 'X' : 'V'}}
            </button>
        </h2>
        <!-- item rows -->
        <div class="row columns" v-for="item in category" v-bind:key="item.id">
            <div class="item column activity">{{ item.label }}</div>
            <div class="item column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
                <Slider 
                    v-if="!column.inputType" 
                    :name="item.id + '_' + column.id"
                    :value="item[column.id]"
                    @change="(e) => setValue(item.id, column.id, e.target.value)" />
                <div 
                    v-if="column.inputType === 'text'" 
                    v-text="item.notes || ''"
                    class="notes-field" 
                    :name="item.id + '_' + column.id"
                    contenteditable="true" 
                    placeholder="Notes" 
                    @keypress="(e) => setValue(item.id, column.id, e.target.innerText)" />
            </div>
        </div>
        <!-- add new item to this category -->
        <div class="add-custom hide-print row columns hide-print">
            <input type="text" class="column" maxlength="40" v-model="newCustomName">
            <button class="new-item column" @click="addItem(newCustomName, getName(category))">Add item to {{ getName(category) }}</button>
        </div>
    </div>
    <!-- add new category -->
    <div class="add-custom hide-print row columns">
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
        <button class="load-button" :class="canLoad ? 'enabled' : 'disabled'" @click="loadJson">Load saved from file</button>
    </div>
  </section>
</template>

<script>
import itemData from '../json/items.json'
import columnData from '../json/columns.json'
import util from '../util/util.js'
import Slider from '../components/Slider.vue'
export default {
  name: 'Items',
  components: {
    Slider
  },
  data() {
    return {
        rawItems: itemData.items,
        categoryOpen: [],
        columns: columnData.columns,
        newCustomName: '',
        newCategoryName: '',
        loadJsonText: '',
        textFile: null
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
        getDataString(e) {
            e.stopPropagation()
            // stringify and obscure current data
            const unreadableData = util.obfuscate(JSON.stringify(this.items))
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
            this.rawItems = JSON.parse(util.deobfuscate(this.loadJsonText))
            this.loadJsonText = ''
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
}
.row:nth-child(even) {
    background: rgb(221, 255, 254);
} 
.row:nth-child(odd) {
    background-color: rgb(252 253 244);
}
.row.column-labels {
    position: sticky;
    top: 0;
    background-color: white;
}

/* notes column */
.notes-field {
    background-color: white;
    border: 1px solid #aaa;
    min-height: 100%;
    text-align: left;
    padding: 1px 3px;
}
.notes-field:empty::before {
    content: 'Notes';
    color: #aaa; 
}
.notes-field:empty:focus::before {
    content: '';
}

/* categories */
.category-title {
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
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
    width: 15%;
}
.column.notes {
    width: 30%;
    flex-basis: auto;
}
@media screen and (max-width:800px) {
    .columns {
        flex-wrap: wrap;
    }
    .column {
        width: 20%;
    }
    .column.notes {
        margin-top: 20px;
        width: 100%;
    }
    .column.activity {
        flex-basis: auto;
        width: 100%;
        margin-bottom: 20px;
    }
}
.column-labels {
    font-weight: bold;
}

/* add new item forms */
.collapsed button.new-item {
    display: none;
}
.add-custom input {
    width: 65%;
    min-width: 300px;
    height: 30px;
    margin-top: 30px;
}
@media screen and (max-width:800px) {
    .add-custom input {
        margin-top: 0;
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

.control-panel {
    margin-top: 100px;
}
.control-panel + .control-panel {
    margin-top: 0;
}
.save-button, .load-button {
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
