<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <h4>Content warning</h4> 
      <p>
        This is a tool used for having conversations to build consent between adults for sex 
        and/or kink. This app contains sexually explicit language, and is meant as an educational tool.
      </p>
      <h4>Using this app</h4>
      <p>
        For privacy reasons, this site does not collect, store, or retain any of your information. <strong>If you refresh the page,
        the form will be reset to blank</strong>. You can privately save your sheet as a .txt file using 
        the "Download to file" button at the bottom. Load your sheet later by pasting the contents of the file in to the field at the 
        bottom of the page as plain text (don't use MS Word).
      </p>
      <h4>Sharing your list</h4> 
      <p>
        To share your list after you fill it out, 
        make sure all the categories you want to include are expanded, closed categories will not appear on your list.
        <b>Print</b> this page, either on paper, or
        print to a PDF and save it. (it looks best if you turn background colors on in your PDF print settings.) You
        can also email someone your ynm.txt file, and they can upload it into the app to view it.
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
      <h4>Credits</h4>
      <p>
        App designed and coded by <a href="https://github.com/jesseharold" target="_blank">jesseharold</a>. With content and inspiration from sex educators like <a href="http://www.bextalkssex.com/" target="_blank">Bex Caputo</a>, 
        <a href="http://www.thatotherpaper.com/austin/yes_no_maybe" target="_blank">RC McCloud</a>, <a href="https://www.scarleteen.com/article/advice/yes_no_maybe_so_a_sexual_inventory_stocklist" target="_blank">and</a> 
        &nbsp;<a href="https://drive.google.com/file/d/1nGtucisumva0kOXggAWH9Y4JEHLl0ts5/view" target="_blank">others</a>.
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
    margin: 0 auto;
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
