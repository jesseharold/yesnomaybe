<template>
  <section>
    <img class="logo" alt="YesNoMaybe logo" src="./assets/logo.png">
    <Intro msg="Welcome to YesNoMaybe" />
    <Items />
    <p>
      YesNoMaybe app designed and coded by <a href="https://github.com/jesseharold" target="_blank">jesseharold</a>. With content and inspiration from sex educators like <a href="http://www.bextalkssex.com/" target="_blank">Bex Caputo</a>, 
      <a href="http://www.thatotherpaper.com/austin/yes_no_maybe" target="_blank">RC McCloud</a>, <a href="https://www.scarleteen.com/article/advice/yes_no_maybe_so_a_sexual_inventory_stocklist" target="_blank">and</a> 
      &nbsp;<a href="https://drive.google.com/file/d/1nGtucisumva0kOXggAWH9Y4JEHLl0ts5/view" target="_blank">others</a>.
    </p>
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
