<template>
  <section id="items">
      <!-- labels row -->
    <div class="row columns column-labels">
        <div class="column activity"></div>
        <div class="column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
            {{ column.label }}
        </div>
    </div>
    <div v-for="category in categorizedItems" v-bind:key="category[0].category" class="category-container" :class="categoryOpen[category[0].category] ? '' : 'collapsed'">
        <!-- categories -->
        <h2 class="category-title" @click="toggleCategory(category[0].category)">{{ category[0].category }}
            <button class="category-toggle hide-print" :name="categoryOpen[category[0].category] ? 'close' : 'open'">
                {{ categoryOpen[category[0].category] ? 'X' : 'V'}}
            </button>
        </h2>
        <!-- item rows -->
        <div class="row columns" v-for="item in category" v-bind:key="item.id">
            <div class="item column activity">{{ item.label }}</div>
            <div class="item column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
                <Slider 
                    v-if="!column.inputType" 
                    :name="item.id + '_' + column.id" 
                    @change="(e) => setValue(item.id, column.id, e.target.value)" />
                <div 
                    v-if="column.inputType === 'text'" 
                    class="notes-field" 
                    :name="item.id + '_' + column.id" 
                    contenteditable="true" 
                    placeholder="Notes" 
                    @keypress="(e) => setValue(item.id, column.id, e.target.innerHTML)" />
            </div>
        </div>
        <!-- add new item to this category -->
        <div class="add-custom hide-print row columns hide-print">
            <input type="text" class="column" maxlength="40" v-model="newCustomName">
            <button class="new-item column" @click="addItem(newCustomName, category[0].category)">Add item to {{ category[0].category }}</button>
        </div>
    </div>
    <!-- add new category -->
    <div class="add-custom hide-print row columns">
        <input type="text" class="column" maxlength="40" v-model="newCategoryName">
        <button class="new-item new-category column" @click="addCategory(newCategoryName)">Add new category</button>
    </div>
    <div class="control-panel hide-print">
        <a 
            :href="dataString" 
            :download="'ynm-' + new Date().getTime() + '.json'" 
            class="save-button" 
            @click="generateJson">
                Save to file (json)
        </a>
    </div>
    <div class="control-panel hide-print">
        <textarea
            ref="loadFromJson"
            id="loadFromJson" 
            name="loadFromJson"
            cols="100" rows="4" 
            placeholder="open your .json file in a plain text editor and paste it in here" />
        <button @click="loadJson">Load saved from file</button>
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
        items: util.alphabetize(itemData.items, 'category'),
        categoryOpen: [],
        columns: columnData.columns,
        newCustomName: '',
        newCategoryName: ''
    }
  },
  computed: {
    dataString() {
        return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.items))
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
        setValue(id, column, value) {
            const item = this.items.filter(itm => itm.id === id)[0]
            item[column] = value
        },
        loadJson() {
            const rawText = this.$refs['loadFromJson'].value
            const json = JSON.parse(rawText)
            console.log(json)
            this.items = json
            console.log(this.items)
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
    display: none;
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
