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
      <p>
        You can collapse any category or delete any item you don't wish to fill out, or just leave it in the
        blank state that each row starts in, which simply indicates no response.
      </p>
      <h4>Sharing your list</h4> 
      <p>
        There are a few different ways to share your list after you fill it out:<br />
        <b>Print</b>. Make sure all the categories you want to include are expanded, closed categories will 
        not appear on your list. Print this page, either on paper, or
        print to a PDF and save it. (it looks best if you turn background colors on in your PDF print settings.) 
        <br />
        <b>Share and view in the app</b>. Email someone your ynm.txt file, and they can view it by uploading it into the app 
        using the "Load saved" button at the bottom.
        <br />
        <b>Compare two lists in the app</b>. While you're viewing your own list, use the "Load and compare" 
        button at the bottom to upload a list someone has shared with you. You will be automatically show 
        where your answers overlap. You can choose how much to filter
        your overlap, whether you want to see everything, or only items where you both have enthusiastic "YES"es.
      </p>
      <h4>Filling it out together (alternate use)</h4> 
      <p>
        Traditionally, these lists are filled out separately, to give everyone time and space to think without
        pressure. But if you prefer to fill this out together with another person, rename the first two columns
        to be "[name of person 1] receiving" and rename the second column to be "[name of person 2] receiving".
        Then go through the list and agree together on a shared level of interest in each person receiving each item.
        If you have different interest levels, the lower of the two should be used. "No"s from anyone should be recorded as no.
      </p>
      <h4>Consent and negotiation</h4> 
      <p>
        Where you have overlapping yeses or maybes with another person, and talk about 
        what it might look like to do it together! <b>If someone has a "no" for any item, it does not need 
        to be discussed.</b> If someone left an item blank, it's up to you if you want to 
        talk about it (the list is long!). Revisit your list periodically, as people's desire and openness changes all the time.
        There are lots of great resources out there <a href="https://www.rainn.org/articles/what-is-consent" 
        target="_blank">about consent</a>.
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
    text-align: left;
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
