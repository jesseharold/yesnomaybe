<template>
  <section id="items">
    <div class="row columns column-labels">
        <div class="column activity">activity</div>
        <div class="column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
            {{ column.label }}
        </div>
    </div>
    <div class="row columns" v-for="item in items" v-bind:key="item.id">
        <div class="item column">{{ item.label }}</div>
        <div class="item column" :class="column.id" v-for="column in columns" v-bind:key="column.id">
            <Slider v-if="!column.inputType" :name="item.id + '_' + column.id" />
            <textarea rows="3" v-if="column.inputType === 'text'" />
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
        columns: columnData.columns
    }
  }
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
    background-color: transparent;
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
}
textarea {
    width: 100%;
}
.column-labels {
    font-weight: bold;
}
</style>
