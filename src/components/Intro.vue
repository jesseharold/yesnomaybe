<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <h4>Content warning</h4> 
      <p>
        This is a tool used for having conversations to build consent between adults for sex 
        and/or kink. This app contains sexually explicit language, and is meant as an educational tool.
      </p>
      <h4>Sharing your list</h4> 
      <p>
        This site does not collect, store, or retain any of your information. To share your list after you filled it out, 
        make sure all the sections you want to share are shown, and then <b>Print</b> this page, either on paper, or
        print to a PDF and save it.
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
