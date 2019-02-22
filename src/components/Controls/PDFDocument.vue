<template>
  <div  class="pdf-document ">
    <PDFPage
      v-for="page in pages"
      v-bind="{page, scale}"
      :key="page.pageNumber"
    />
  </div>
</template>

<script>
  import range   from 'lodash/range';
  import PDFPage from  './PDFPage';
  // import file    from '../../../static/MM-X62_2017-10.pdf'

  export default {
    name: "PDFDocument",
    props: {
      'url':String, 'scale': Number, 'entityId': Number, 'entity': Object,
    },
    components: {PDFPage},

    data() {
      return {
        pdf: undefined,
        pages: [],
      };
    },


    render(h) {
      const {canvasAttrs: attrs} = this;
      return h('canvas', {attrs});
    },
    created() {
      this.fetchPDF();
    },
    watch: {
      pdf(pdf) {
        this.pages = [];
        // const promises = range(1, pdf.numPages).map(number => pdf.getPage(number));
        // console.log(this.entity.pageStart);
        const promises = range(this.entity.pageStart, this.entity.pageFinish ).map(number => pdf.getPage(number));

        Promise.all(promises).then(pages => (this.pages = pages));
      },
      entity(entityId) {
        this.fetchPDF();
      }
    },
    methods: {
      fetchPDF() {
        import('pdfjs-dist/webpack').
        then(pdfjs => pdfjs.getDocument(this.url)).
        then(pdf => (this.pdf = pdf));
      },
    },
  }
</script>

<style scoped>
  .pdf-document {
    /*position: absolute;*/
    /*overflow: auto;*/
    /*width: 100%;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*background: #525f69;*/
  }

</style>
