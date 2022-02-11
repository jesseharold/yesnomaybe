<template>
  <section>
    <img alt="Vue logo" src="./assets/logo.png">
    <Intro msg="Welcome to YesNoMaybe" />
    
    <Items />
  </section>
</template>

<script>
import Intro from './components/Intro.vue'
import Items from './components/Items.vue'

export default {
  name: 'App',
  components: {
    Intro,
    Items
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
