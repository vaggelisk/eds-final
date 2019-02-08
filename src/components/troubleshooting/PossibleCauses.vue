<template>
  <v-container style="margin: -20px">
    <v-card-title class="headline">Possible Causes</v-card-title>

    <v-data-table style="margin-right: -40px;"
                  v-model="selected"
                  hide-headers
                  :rows-per-page-items=[3]
                  :items="currentInnerFaultCauses"
                  item-key="name"
                  class="elevation-1"
                  color="rgb(42,42,42)"
    >
      <template slot="items" slot-scope="props" >
        <td class="text-truncate text-lg-left" bgcolor="#2A2A2A"> {{props.item.name}}</td>
        <td class="text-truncate text-lg-right" bgcolor="#2A2A2A">
          <v-dialog v-model="pdfDialog" max-width="1000px">
            <v-btn slot="activator" flat icon     >
              <v-icon @click="openPdfDialog()"   md-inactive  > <!-- super sos  -->
                picture_as_pdf
              </v-icon>
            </v-btn>
            <template>

              <pdf
                v-for="index in [15, 16, 17 ]"
                  :key="index"
                  :src='"../../../static/"+props.item.pdf.filename'
                  :page="index">
                >
              </pdf>
              <!--</div>-->
            </template>
          </v-dialog>


          <v-dialog v-model="maintenanceDialog" max-width="800px">
            <v-btn  slot="activator" flat icon   >
              <v-icon
                @click="openMaintenanceDialog( props.item.maintenance )"
              >
                event
              </v-icon>
            </v-btn>
            <v-card  style="background-color:  rgb(42,42,42);">
              <v-card-title>
                <span class="headline">Add to Maintenance Plan</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        label="Task"
                        disabled
                        readonly
                        :value=d
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        label="Type"
                        value="Overhaul"
                        disabled
                        readonly
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        label="Element"
                        value="Cylinder 2"
                        disabled
                        readonly
                      ></v-text-field>
                      <!--<span class="body-1">Element: </span> Cylinder 2-->
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field
                        label="Component"
                        value="Exhaust Valve"
                        disabled
                        readonly
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap>
                    <v-flex d-flex xs12 sm6 md6>
                      <!--<span class="body-2">Resources(persons):  </span>-->
                      <v-select
                        :items="itemsPerson"
                        label="Resources(persons): "
                      ></v-select>
                    </v-flex>
                    <v-flex d-flex xs12 sm6 md6>
                      <!--<span class="body-2">Resources(persons):  </span>-->
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="dateFormatted"
                          label="Date  (MM/DD/YYYY)"
                          persistent-hint
                          prepend-icon="event"
                          @blur="date = parseDate(dateFormatted)"
                        ></v-text-field>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex>


                      <v-textarea outline
                                  label="Comments"
                                  rows="6"
                                  auto-grow
                                  counter=2000
                                  v-model="commentsDial"
                      ></v-textarea>

                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  flat @click="close">Cancel</v-btn>
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


    <v-layout  class="buttons" ml-3 row wrap style="margin-right: -40px">

      <v-btn block style="background-color: rgb(51, 82, 128)" dark> Request Remote Support</v-btn>

      <v-btn style="background-color: rgb(51, 82, 128)"  dark> Fault Report</v-btn>

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
      computedDateFormatted () {
        return this.formatDate(this.date)
      },

      currentInnerFault: function () {
        return this.currentInnerFaults.find(obj => obj.Id === this.currentInnerFaultId);
      },
      currentInnerFaultCauses: function () {
        let s = [];
        for (let i = 0; i < this.currentInnerFault.causes.length; i++) {
          // let maintId = this.currentInnerFault.mTasks[i];
          let maint = ((this.currentInnerFault.mTasks[i] === null) ? {} : EDS_Maintenance_Tasks.find(obj => obj.id === this.currentInnerFault.mTasks[i]));
          // console.log(maint);
          s.push(
            {
              id: (i + 1).toString(),
              name: this.currentInnerFault.causes[i],
              pdf: {
                filename: this.currentInnerFault.causeManual[i],
                page: parseInt( this.currentInnerFault.causePage[i] ),
              },
              maintenance: maint,
            }
          )
        }
        // console.log(s);
        return s;
      }
    },


    data: (vm) => ({

      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,

      itemsPerson: [1, 2, 3, 4, 5],
      selectedPerson: 1,
      url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS', // a PDF
      scale: 2,
      comments: "",
      commentsDial: "",
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

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },


    methods: {
      openPdfDialog( ) {

        this.pdfDialog = true
      },


      formatDate (date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null;

        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

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
  mytable {
    color: rgb(42,42,42);
    background-color: rgb(42,42,42);
  }

</style>


