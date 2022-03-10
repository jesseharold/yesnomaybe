<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <h3>Content warning</h3> 
      <p>
        This is a tool used for having conversations to build consent between adults for sex 
        and/or kink. This app contains sexually explicit language, and is meant as an educational tool.
      </p>
      <h3>Do I have to fill this whole thing out?</h3>
      <p>
        This list is long! Don't give yourself negotiation fatigue. You can collapse any category or delete any 
        item you don't wish to fill out. Or just leave it in the
        blank state that each row starts in, which simply indicates "no response". When sharing, let the other
        person know you don't want to discuss all the blank items, and save your energy for the fun stuff! You can
        always revisit later. Also, the "previous experience" column can be removed, if it doesn't feel important to you.
      </p>
      <h3>Privacy</h3>
      <p>
        This site does not, and will never collect, store, or retain any of your personal information. <strong>If you refresh the page,
        the form will be reset to blank</strong> and all information will be fully discarded. All the save and share
        options listed below take place on your computer for this reason. Protect your privacy by being careful with
        how you store and share your lists. 
      </p>
      <h3>Saving your list</h3>
      <p>
        There are a few different ways to save your list after you fill it out.<br /><br />
        <b>Print</b>. Print this page, either on paper, or
        print to a PDF and save it. Make sure all the categories you want to include are expanded. Collapsed categories will 
        not appear on your printed list. It looks best if you turn background colors on in your PDF print settings.
        <br /><br />
        <b>ynm.txt</b> You can privately save your list as an obscured (not readable
        by humans) ynm.txt file using the "Download to file" button at the bottom. Load your sheet later to view or
        keep working on it by opening the ynm.txt file in a plain text
        editor (not MS Word) and pasting the contents into the field at the bottom of the page. Make sure to dowload a new ynm.txt
        file after you have made changes.
      </p>
      <h3>Sharing your list</h3> 
      <p>
        <b>Show or send someone your printed list</b>. Sit together in person with your lists and discuss, or email them your 
        PDF.
        <b>Share and view in the app</b>. Email someone your ynm.txt file. They can view it by coming to the site
        and uploading it, using the "Load saved list" button at the bottom.
        <br /><br />
        <b>Compare two lists in the app</b> (new!). While you're viewing your own list, use the "Load and compare" 
        button at the bottom to upload a ynm.txt file someone has shared with you. You will be automatically shown 
        where your "giving" answers overlap with the other person's "receiving" answers, and vice versa. 
        You can choose how much to filter
        your overlap, whether you want to see everything, or only items where you both have enthusiastic "YES"es.
      </p>
      <h3>Filling it out together (alternate use)</h3> 
      <p>
        Traditionally, these lists are filled out separately, to give everyone time and space to think without
        pressure. But if you prefer to fill this out together with another person, use the little pencil icons to 
        rename the giving/receiving columns to "[name/initial of person 1] receiving" and "[name/initial of person 2] receiving".
        You might want to hide the "experience" column, since there's only one.
        Then go through the list and agree together on a shared level of interest in each person receiving any interesting items.
        If you have different interest levels, the lower of the two should be used. "No"s from anyone should be recorded as no.
      </p>
      <h3>Consent and negotiation</h3> 
      <p>
        Where you have overlapping "yes"es or "maybe"s with another person, talk about 
        what it might look like to do it together! <b>If someone has a "no" for any item, it does not need 
        to be discussed.</b> Revisit your list periodically, as people's desire and openness changes all the time.
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
h1 {
  color: #71377f;
  text-align: center;
  font-size: xx-large;
}
h3 {
  margin: 40px 0 0;
  color: #047571;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
