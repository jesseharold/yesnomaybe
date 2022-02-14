<template>
  <section id="items">
      <!-- labels row -->
    <div class="row columns column-labels">
        <div class="column activity"></div>
        <div class="column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
            {{ column.label }}
        </div>
    </div>
    <div v-for="category in categories" v-bind:key="category" class="category-container" :class="categoryVisibility[category] ? '' : 'collapsed'">
        <!-- categories -->
        <h2 class="category-title" @click="toggleCategory(category)">{{ category }}
            <button class="category-toggle" :name="categoryVisibility[category] ? 'close' : 'open'">{{ categoryVisibility[category] ? 'X' : 'V'}}</button>
        </h2>
        <!-- item rows -->
        <div class="row columns" v-for="item in itemsInCategory(category)" v-bind:key="item.id">
            <div class="item column activity">{{ item.label }}</div>
            <div class="item column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
                <Slider v-if="!column.inputType" :name="item.id + '_' + column.id" />
                <div v-if="column.inputType === 'text'" class="notes-field" contenteditable="true" placeholder="Notes" />
            </div>
        </div>
        <!-- add new item to this category -->
        <div class="add-custom row columns">
            <input type="text" class="column" maxlength="40" v-model="newCustomName">
            <button class="new-item column" @click="addItem(newCustomName, category)">Add item to {{ category }}</button>
        </div>
    </div>
    <!-- add new category -->
    <div class="add-custom row columns">
        <input type="text" class="column" maxlength="40" v-model="newCategoryName">
        <button class="new-item new-category column" @click="addCategory(newCategoryName)">Add new category</button>
    </div>
  </section>
</template>

<script>
import itemData from '../json/items.json'
import columnData from '../json/columns.json'
import Slider from '../components/Slider.vue'
export default {
  name: 'Items',
  components: {
    Slider
  },
  data() {
    return {
        items: itemData.items,
        columns: columnData.columns,
        // gets all unique category values defined in the data
        categories: [...new Set(itemData.items.map(item => item.category))],
        categoryVisibility: this.setDefaultCategoryVisibility(),
        newCustomName: '',
        newCategoryName: ''
    }
  },
  methods: {
        itemsInCategory(category) {
            return this.alphabetize(this.items.filter(item => item.category === category))
        },
        toggleCategory(category) {
            // clear any abandoned custom item
            this.newCustomName = ''
            this.categoryVisibility[category] = !this.categoryVisibility[category]
        },
        setDefaultCategoryVisibility() {
            const cats = [...new Set(itemData.items.map(item => item.category))]
            return cats.reduce((o, key) => ({ ...o, [key]: false}), {})
        },
        alphabetize(array) {
            return array.sort(function(a, b) {
                var itemA = a.label.toUpperCase()
                var itemB = b.label.toUpperCase()
                return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0
            })
        },
        addItem(name, categoryName) {
            this.newCustomName = ''
            if (this.categories.indexOf(categoryName) === -1) {
                this.addCategory(categoryName)
            }
            const newItem = {
                id: "custom-" + this.slugify(name),
                category: categoryName,
                label: name
            }
            this.items.push(newItem)
        },
        slugify(str) {
            str = str.replace(/^\s+|\s+$/g, ""); // trim
              str = str.toLowerCase();

            // remove special characters
            var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to = "aaaaaaeeeeiiiioooouuuunc------";

            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
            }

            str = str
                .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
                .replace(/\s+/g, "-") // collapse whitespace and replace by -
                .replace(/-+/g, "-") // collapse dashes
                .replace(/^-+/, "") // trim - from start of text
                .replace(/-+$/, ""); // trim - from end of text

            return str;
        },
        addCategory(name) {
            this.newCategoryName = ''
            this.categories.push(name)
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

/* print styles */

@media print {
    .category-toggle {
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
    .collapsed .category-title {
        display: none;
    }
    .add-custom {
        display: none !important;
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
