<template>
    <Editor
        v-if="isLoaded && !disabled"
        :api-key="tinyMceKey"
        class="notes-field"
        :ref="`notes-${itemId}`"
        :name="itemId + '_' + columnId"
        initial-value=""
        :value="modelValue"
        :inline="true"
        :disabled="disabled"
        :init="{
        menubar: false,
        plugins: [],
        toolbar: '',
        }"
    />
    <div class="notes-editor-placeholder" @click="loadEditor" v-else>
      Click to add notes
    </div>
  </template>
  
  <script>
  import Editor from "@tinymce/tinymce-vue";
  
  export default {
    name: "EditorLoader",
    props: {
      itemId: String,
      columnId: String,
      disabled: Boolean,
      modelValue: String,
    },
    components: {
      Editor,
    },
    data() {
      return {
        isLoaded: false,
        tinyMceKey: process && process.env ? process.env.VUE_APP_TINYMCE_KEY : ''
      };
    },
    methods: {
      loadEditor() {
        this.isLoaded = true
      },
    },
  };
  </script>
  
  <style scoped>
  /* notes column */
  .notes-field, .notes-editor-placeholder {
    color: #666;
    background-color: #f8ffff;
    border: 1px dashed #999;
    text-align: left;
    margin: 0;
    padding: 0 5px;
    font-size: 14px;
    min-height: 37px;
  }
  .notes-field p {
    margin: 0;
  }
  
  /* print styles */
  @media print {
    .notes-field {
      border: 0;
    }
    .notes-field:empty::before {
      content: "";
    }
  }
  </style>
  