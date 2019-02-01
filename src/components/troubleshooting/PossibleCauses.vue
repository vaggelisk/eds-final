<template>
  <v-container style="margin: -20px">
    <v-card-title class="headline">Possible Causes</v-card-title>

    <v-data-table style="margin-right: -40px"
                  v-model="selected"
                  hide-headers
                  :rows-per-page-items=[3]
                  :items="currentFaultCauses"
                  item-key="name"
                  class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-truncate text-lg-left"> {{props.item.name}}</td>
        <td class="text-truncate text-lg-right">
          <v-dialog v-model="pdfDialog" max-width="1000px">
            <v-btn slot="activator" flat icon     >
              <v-icon @click="openPdfDialog(props.item.pdf)"            md-inactive  > <!-- super sos  -->
                picture_as_pdf
              </v-icon>
            </v-btn>
            <template>


              <pdf
                v-for="index in [props.item.pdf.page, props.item.pdf.page+1, props.item.pdf.page+2, props.item.pdf.page+3 ]"
                :key="index"
                :src='"../../../static/"+props.item.pdf.filename'
                :page="index">
                >
              </pdf>
            </template>

          </v-dialog>


          <v-dialog v-model="maintenanceDialog" max-width="800px">
            <v-btn slot="activator" flat icon>
              <v-icon
                @click="openMaintenanceDialog(props.item.maintenance)"
              >
                event
              </v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Add to Maintenance Plan</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                      <span class="body-2">Task: </span> {{d}}
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <span class="body-2">Type: </span> {{d}}
                    </v-flex>
                  </v-layout>
                  <!--<v-layout wrap>-->
                    <!--<v-flex xs12 sm6 md6>-->
                      <!--<span class="body-2">Task: </span> {{d}}-->
                    <!--</v-flex>-->
                    <!--<v-flex xs12 sm6 md6>-->
                      <!--<span class="body-2">Type: </span> {{d}}-->
                    <!--</v-flex>-->
                  <!--</v-layout>-->
                  <!--<v-layout wrap>-->
                    <!--<v-flex xs12 sm6 md6>-->
                      <!--<span class="body-2">Task: </span> {{d}}-->
                    <!--</v-flex>-->
                    <!--<v-flex xs12 sm6 md6>-->
                      <!--<span class="body-2">Type: </span> {{d}}-->
                    <!--</v-flex>-->
                  <!--</v-layout>-->
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </td>
      </template>
    </v-data-table>


    <v-textarea outline style="margin-right: -40px"
                label="Comments"
                rows="6"
                auto-grow
                counter=2000
                v-model="comments"
    ></v-textarea>

    <!--{{ currentFault }}-->
    <!--{{ currentInnerFaultId }}-->

    <!--{{ currentFaultCauses}}-->

    <v-layout class="buttons" ml-3 row wrap style="margin-right: -40px">

      <v-btn block color="indigo" dark> Request Remote Support</v-btn>

      <v-btn color="indigo" dark> Fault Report</v-btn>

    </v-layout>

  </v-container>
</template>

<script>
  import {EDS_Maintenance_Tasks} from "../../api/dataEdsMaintenanceTasks";
  import pdf from 'vue-pdf'


  export default {
    name: "PossibleCauses",
    components: {
      pdf,
    },
    props: {
      currentFaultId: Number,
      currentInnerFaultId: Number,
      currentInnerFaults: Array,
    },
    computed: {
      currentFault: function () {
        // console.log(this.currentInnerFaults[0].Id);
        return this.currentInnerFaults.find(obj => obj.Id === this.currentInnerFaultId);
      },
      currentFaultCauses: function () {
        let s = [];
        for (let i = 0; i < this.currentFault.causes.length; i++) {
          // let maintId = this.currentFault.mTasks[i];
          let maint = ((this.currentFault.mTasks[i] === null) ? {} : EDS_Maintenance_Tasks.find(obj => obj.id === this.currentFault.mTasks[i]));
          // console.log(maint);
          s.push(
            {
              id: (i + 1).toString(),
              name: this.currentFault.causes[i],
              pdf: {
                filename: this.currentFault.causeManual[i],
                page: parseInt(this.currentFault.causePage[i]),
              },
              maintenance: maint,
            }
          )
        }
        // console.log(s);
        return s;
      }
    },


    data: () => ({
      // causes_2 : this.currentFaultCauses.causes,
      url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS', // a PDF
      scale: 2,
      comments: "",
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      pdfDialog: false,
      maintenanceDialog: false,
      d: '',

      x: [{
        "id": "1",
        "name": "Insufficient air spring pressure",
        "pdf": {"filename": "OM-X62_2017-10.pdf", "page": 195},
        "maintenance": {}
        },
        {
          "id": "2",
          "name": "Restricted VCU return",
          "pdf": {"filename": "OM-X62_2017-10.pdf", "page": 119},
          "maintenance": {
            "id": 5,
            "description": "Exhaust valve control unit removal",
            "component": 4,
            "tools": "-",
            "documentation": "351"
          }
        },
        {
          "id": "3",
          "name": "Exhaust valve stem sticking",
          "pdf": {"filename": "OM-X62_2017-10.pdf", "page": 119},
          "maintenance": {
            "id": 1,
            "description": "Exhaust valve - removal and installation",
            "component": 4,
            "tools": "2 Sling 94049A",
            "documentation": "177"
          }
        }
      ],


    }),


    methods: {
      openPdfDialog(i) {
        this.pdfDialog = true
      }
      ,

      openMaintenanceDialog(i) {
        this.d = i.description;
        this.maintenanceDialog = true;
      }
      ,
      close() {
        this.maintenanceDialog = false
      }
      ,
      save() {
        this.maintenanceDialog = false
      }
    }
    ,
    mounted() {

    }
    ,


  }
</script>

<style scoped>

</style>


