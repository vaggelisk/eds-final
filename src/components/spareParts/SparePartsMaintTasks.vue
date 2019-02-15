<template>
  <div>
    <a href="../../../static/OCHA_KOULIKORO_KATI_A3_20131010.pdf">fghfghfghgfhfgh</a>
    <!--<PDFViewer-->
      <!--v-bind="{url}"-->
      <!--@document-errored="onDocumentErrored"-->
    <!--&gt;-->

    <!--</PDFViewer>-->
  </div>
</template>

<script>
  import PDFViewer from 'pdfjs-dist'

  export default {
    name: "SparePartsMaintTasks",
    components: {
      PDFViewer,
    },

    data() {
      return {
        url: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
        // url: process.env.VUE_APP_PDF_URL,
        documentError: undefined,
        // enableUploader: true,
        // enableUploader: process.env.VUE_APP_UPLOAD_ENABLED === 'true',
      };
    },

    methods: {
      urlUpdated(url) {
        this.documentError = undefined;
        this.url = url;
      },
      onDocumentErrored(e) {
        this.documentError = e.text;
      },
    },

  }
</script>

<style scoped>

</style>
