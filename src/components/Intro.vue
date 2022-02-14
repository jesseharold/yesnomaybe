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
        print to a PDF and save it. You might want to write your name or initial and the date on it before sharing, so you
        you don't get them mixed up! :)
      </p>
      <h4>Consent and negotiation</h4> 
      <p>
        Sit with another person, check and see where you have overlapping yeses or maybes, and talk about 
        what it might look like to do it together! <b>If someone has a "no" for any item, it does not need 
        to be discussed.</b> If someone hasn't set a value for an item, it's up to you if you are open to 
        talking about it. Revisit your list periodically, as people's desire and openness changes all the time.
        There are lots of great resources out there <a href="https://www.rainn.org/articles/what-is-consent" 
        target="_blank">about consent</a>, please review them periodically, too! 
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
