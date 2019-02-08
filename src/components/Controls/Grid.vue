<template>
  <v-container fluid grid-list-md>
    <v-flex>
    <v-data-table
      :headers="headers"
      :items="currentInnerFaultsNat"
      class="elevation-1"
      item-key="name"
      :rows-per-page-items=[6]
    >

    <template slot="items" slot-scope="props"      >
      <tr @click="selectedInnerFaultId(props.item.Id)">
        <td bgcolor="#2A2A2A">
          <v-icon small  class="mr-2" :style='"color: "+colorFormatter(props.item.color)+";"'>information </v-icon>
        </td>
        <td bgcolor="#2A2A2A"><a>{{ props.item.fault }}</a></td>
        <td bgcolor="#2A2A2A" class="text-xs-right"><a>{{ props.item.element }}</a></td>
        <td bgcolor="#2A2A2A" class="text-xs-right"><a>{{ props.item.index }}</a></td>
        <td bgcolor="#2A2A2A" class="text-xs-right"><a>{{ props.item.color }}</a></td>
        <td bgcolor="#2A2A2A" class="text-xs-right"><a>{{ props.item.subComponent }}</a></td>
        <td bgcolor="#2A2A2A" class="text-xs-right"><a>{{ props.item.Date | dateFormatter }}</a></td>
      </tr>

    </template>
    <template slot="pageText" slot-scope="props" style="background-color: #2A2A2A">
       Faults {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
    </template>
    </v-data-table>
      <!--{{currentFaultId}}-->

      <!-- {{currentInnerFaultsNat}} -->
    </v-flex>
  </v-container>
</template>


<script>


  export default {
    name: "Grid",
    props: {
      currentInnerFaultId: Number,
      currentFaultId: Number,
      currentInnerFaults: Array,
    },
    data: function() {
      return {
        currentInnerFaultsNat: this.currentInnerFaults,
        selected: [],
        headers: [
          { text: 'Status', value: 'name', sortable: false },
          {
            text: 'Description',
            align: 'left',
            sortable: false,
            value: 'fault'
          },
          { text: 'Element',   value: 'element',     sortable: false,  align: 'right' },
          { text: 'No',        value: 'index',       sortable: false,  align: 'right' },
          { text: 'Subsystem', value: 'component',   sortable: false,  align: 'right' },
          { text: 'Component', value: 'subComponent',sortable: false,  align: 'right' },
          { text: 'Date/Time', value: 'datetime',                      align: 'right' },
        ],
      }
    },
    watch: {
      currentFaultId() {
        this.currentInnerFaultsNat.length=0;
        this.currentInnerFaultsNat.push(...this.currentInnerFaults);
      },
      currentInnerFaultsNat: {
        handler: function (val, oldVal) {
          console.log('a currentInnerFaultNat changed')
        },
        deep: true,
      }
    },
    filters: {
      dateFormatter: function (value) {
        if (!value) return '';
        let d = new Date(value);
        return d.toLocaleString();
      },

    },
    methods: {
      selectedInnerFaultId: function( i ) {
        console.log("hiiii "+ i );
        this.$emit('update:currentInnerFaultId', i)
      },
      colorFormatter: function (value) {
        if (value===0) return 'rgb(60, 171, 48)';
        else if (value===10) return 'rgb(255, 184, 29)';
        else return 'rgb(205, 57, 64)';
      },
    },
    mounted() {


    }
  }
</script>

<style scoped>
  a {
    color: white;
  }

</style>
