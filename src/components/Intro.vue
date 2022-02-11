<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Content warning: this is a tool used for having conversations to build consent between adults for sex 
      and/or kink. This app contains sexually explicit language, and is meant as an educational tool.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.hello {
    max-width: 1024px;
    margin: 30px auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
