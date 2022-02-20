<template>
  <section>
    <img class="logo" alt="YesNoMaybe logo" src="./assets/logo.png">
    <Intro msg="Welcome to YesNoMaybe" />
    
    <Items />
  </section>
</template>

<script>
import Intro from './components/Intro'
import Items from './components/Items'

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
  margin-bottom: 70px
}
.logo {
  max-width: 100%;
}
@media print {
  .logo, .hello {
    display: none;
  }
}
</style>
