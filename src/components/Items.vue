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
        <h2 class="category-title">{{ category }} <button class="category-toggle" @click="toggleCategory(category)">{{ categoryVisibility[category] ? 'Hide' : 'Show'}} this category</button></h2>
        <!-- item rows -->
        <div class="row columns" v-for="item in itemsInCategory(category)" v-bind:key="item.id">
            <div class="item column">{{ item.label }}</div>
            <div class="item column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
                <Slider v-if="!column.inputType" :name="item.id + '_' + column.id" />
                <textarea rows="3" v-if="column.inputType === 'text'" placeholder="Notes" />
            </div>
        </div>
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
        categoryVisibility: this.setDefaultCategoryVisibility()
    }
  },
  methods: {
        itemsInCategory(category) {
            return this.alphabetize(this.items.filter(item => item.category === category))
        },
        toggleCategory(category) {
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
        }
  },
}
</script>

<style scoped>
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
.category-title {
    display: flex;
    justify-content: space-between;
}
.collapsed .category-title {
    color: #999;
}
.category-toggle {
    background-color: #dff7d7;
    border: 1px solid #9c2ea3;
    color: #9c2ea3;
    border-radius: 5px;
}
.category-toggle:hover {
    background-color: rgb(11, 121, 110);
    color: white;
}
.category-container.collapsed .row {
    display: none;
}
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
}
textarea {
    width: 100%;
}
.column-labels {
    font-weight: bold;
}
</style>
