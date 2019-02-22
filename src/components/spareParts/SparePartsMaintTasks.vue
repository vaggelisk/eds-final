<template>
  <v-layout row >
    <v-flex  xs12 sm6 md5 ml-3 mt-3>
      <v-card  >
        <v-card-title style="text-decoration-color: white;" class="headline">
          EDS Maintenance Tasks
        </v-card-title>

        <template>
          <v-data-table
            :items="maintenanceTasks"
            hide-actions
            hide-headers
          >
            <template slot="items" slot-scope="props">

              <tr  :active="props.item.id===selectedId" @click="selectRow(props.item)">
                <td>{{ props.item.description }}</td>
                <td class="text-xs-right"> Cylinder 4</td>
                <td class="text-xs-right">Servo Oil</td>
                <td class="text-xs-right">5/1/2019 14.33</td>
                <td class="text-xs-right">PMS</td>
              </tr>
            </template>
          </v-data-table>
        </template>


      </v-card>
    </v-flex>

    <v-flex  xs12 sm6 md7 mt-3  ml-3 mr-3>

      <v-card >
        <v-card-title style="text-decoration-color: white;" class="headline">
          Spare Parts
        </v-card-title>

        <template>
          <v-data-table
            :headers="headers"
            :items="selected[0].spareParts"
            :rows-per-page-items=[3]
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <tr  :active="props.item.id===selectedSparePartId" @click="selectSparePartRow(props.item)">
                <td>{{ props.item.partNumber }}</td>
                <td class="text-xs-left"> {{ props.item.description }}</td>
                <td class="text-xs-center">2</td>
                <td class="text-xs-center">1</td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-card>

      <v-card mt-3 >
        <template >
          <div style="overflow-y:scroll; height: 640px" class="text-xs-center">
            <pdf
              v-for="i in endPage-startPage"
              :key="i"
              :src="src"
              :page="i+startPage"
              >
          </pdf>
        </div>
        </template>

      </v-card>

    </v-flex>
  </v-layout>
</template>



<script>
  import {EDS_Maintenance_Tasks} from "../../api/dataEdsMaintenanceTasks";
  import pdf from 'vue-pdf'
  //  import PDFDocument from '../Controls/PDFDocument'
  //  https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK

  const loadingTask = pdf.createLoadingTask('../../../static/MM-X62_2017-10.pdf');

  export default {
    name: "SparePartsMaintTasks",
    components: { pdf,},
    data: function() {
      return {
        selectedSparePartId: Number,
        selectedId: Number,
        maintenanceTasksIds: [2, 3],
        startPage: 0,
        src: loadingTask,
        selected: [ ],
        selectedSparePart: [ ],
        // scale: 1,


        headers: [
          {
            text: 'Part Number',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Description',       value: 'calories',  align: 'left', sortable: false, },
          { text: 'Parts In Assembly', value: 'fat',       align: 'center', sortable: false, },
          { text: 'Inventory',         value: 'carbs',     align: 'center', sortable: false, },
        ]


      }
    },
    beforeMount() {
      this.selectedId = this.maintenanceTasksIds[0];
      this.selected.push( EDS_Maintenance_Tasks.find(obj => obj.id === this.maintenanceTasksIds[0]) );
      this.selectedSparePartId = this.selected[0].spareParts[0].id;
      this.selectedSparePart.push( this.selected[0].spareParts.find(obj => obj.id === this.selectedSparePartId ));
      this.startPage = parseInt( this.selectedSparePart[0].page );
    },
    computed: {
      endPage: function () {
        return this.startPage + 6;
      },
      maintenanceTasks: function () {
        let mt = [];
        for (let j = 0; j < this.maintenanceTasksIds.length; j++){
          let t = EDS_Maintenance_Tasks.find(obj => obj.id === this.maintenanceTasksIds[j]);
          mt.push(t);
        }
        return mt
      },
    },

    methods: {
      selectRow(it) {
        this.selectedId = it.id;
        if (this.selected.length > 0) {
          this.selected.shift();
          this.selected.push(it);
          this.selectSparePartRow( it.spareParts[0] );
        } else {
          this.selected.push(it);
        }
      },
      selectSparePartRow(it) {
        this.selectedSparePartId = it.id;
        if (this.selectedSparePart.length > 0) {
          this.selectedSparePart.shift();
          this.selectedSparePart.push(it);
          this.startPage = parseInt( it.page );
        } else {
          this.selectedSparePart.push(it);
          this.startPage = parseInt( it.page );
        }
      },
    },
    mounted() {

    }

  }
</script>



<style scoped>



</style>


