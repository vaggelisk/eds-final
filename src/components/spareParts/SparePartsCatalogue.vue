<template>
  <v-layout row >
    <v-flex  xs12 sm6 md5 ml-3 mt-3>
     <v-card  class="text-xs-center">
       <v-card-title style="text-decoration-color: white;" class="headline">
         Spare Parts Catalogue - W6X62
       </v-card-title>

       <v-list>
         <div v-for="(item, index) in sparePartsCatalogueEntities">
           <v-list-tile v-if="selected.indexOf(index) < 0"
             class="mt-3 mb-3"
             :key="item.id"
             @click="toggle(index)"
           >

             <v-list-tile-content  >
               <v-list-tile-title>{{item.id}}.{{ item.ent }}</v-list-tile-title>

             </v-list-tile-content>

             <v-list-tile-action>
               <v-icon
                 v-if="selected.indexOf(index) < 0"
                 color="grey lighten-1"
               >
                 star_border
               </v-icon>

               <v-icon
                 v-else
                 color="yellow darken-2"
               >
                 star
               </v-icon>
             </v-list-tile-action>

           </v-list-tile>

           <v-list-tile v-else
                        class="mt-3 mb-3"
                        :key="item.id"
                        @click="toggle(index)" disabled
           >

             <v-list-tile-content  >
               <v-list-tile-title>{{item.id}}.{{ item.ent }}</v-list-tile-title>

             </v-list-tile-content>

             <v-list-tile-action>
               <v-icon
                 v-if="selected.indexOf(index) < 0"
                 color="grey lighten-1"
               >
                 star_border
               </v-icon>

               <v-icon
                 v-else
                 color="yellow darken-2"
               >
                 star
               </v-icon>
             </v-list-tile-action>

           </v-list-tile>

           <v-divider
             v-if="index + 1 < sparePartsCatalogueEntities.length">
           </v-divider>

         </div>
       </v-list>
     </v-card>
    </v-flex>
    <v-flex d-flex xs12 sm6 md7 class="justify-center mt-3">
      <template>
        <v-progress-linear v-if="isLoading" :indeterminate="true"></v-progress-linear>
        <div style="overflow-y:scroll; height: 940px" class="text-xs-center">
          <PDFDocument v-bind="{url, scale, entityId, entity}" />
        </div>
      </template>

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
          // url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS', // a PDF
          // url: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK', // a PDF
          isLoading: true,
          selected: [0],
          url: '../../../static/MM-X62_2017-10.pdf', // a PDF
          scale: 1.5,
          sparePartsCatalogueEntities: [{
            id: 0, ent: 'General Information', pageStart: 1, pageFinish: 12
          }, {
            id: 1, ent: 'Bedplate, Engine Frame and Tie Rod', pageStart: 23, pageFinish: 44
          }, {
            id: 2, ent: 'Cylinder Jacket, Cylinder Liner, Cylinder Cover', pageStart: 45, pageFinish: 90
          },
            {
            id: 3, ent: 'Crankshaft, Connecting Rod and Piston', pageStart: 77, pageFinish: 79
          }, {
            id: 4, ent: 'Intermediate Wheel, Shut-Off Valve and Control Elements', pageStart: 80, pageFinish: 84
          }, {
            id: 5, ent: 'Supply Unit, Injection and Exhaust Valve Control', pageStart: 85, pageFinish: 109,
          },
            {id: 6, ent: 'Scavenge Air Receiver and Auxiliary Blower', pageStart: 110, pageFinish: 109},
            {
            id: 7, ent: 'Cylinder Lubrication', pageStart: 85, pageFinish: 109,
          }, {
            id: 8, ent: 'Piping', pageStart: 130, pageFinish: 150,
          }, {
            id: 9, ent: 'Engine Monitoring Instruments / Spare Parts', pageStart: 151, pageFinish: 180,
          }
          ]
        }
      },
      computed: {
        entityId: function() {
          return this.selected[0];
        },
        entity: function () {
          return this.sparePartsCatalogueEntities[this.entityId];
        }
      },
      methods: {
        toggle (index) {
          this.isLoading = true;
          const i = this.selected.indexOf(index);

          if (i > -1) {
            // this.selected.splice(i, 1)
          } else {
            this.selected.push(index);
            this.selected.shift();
          }
        }
      },
      mounted() {
        this.isLoading = false;
      }

    }
</script>

<style scoped>



</style>


