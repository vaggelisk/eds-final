<template>
  <v-layout row >
    <v-flex d-flex xs12 sm6 md4>
      <div>
        fgfgfg
      </div>
    </v-flex>
    <v-flex d-flex xs12 sm6 md8>
      <div>
        <PDFDocument v-bind="{url, scale}" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
    import PDFDocument from '../Controls/PDFDocument'

    export default {
      name: "SparePartsCatalogue",
      components: {PDFDocument},
      data: function() {
        return {
          url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS', // a PDF
          scale: 1,
        }
      },

    }
</script>

<style scoped>



</style>
