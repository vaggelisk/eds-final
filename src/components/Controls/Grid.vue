<template>
  <v-container fluid grid-list-md>
    <v-flex>


    <v-data-table
      :headers="headers"
      :items="currentInnerFaults"
      class="elevation-1"
      item-key="name"
      :rows-per-page-items=[6]

  >
    <template slot="items" slot-scope="props"
            >
      <tr @click="selectedInnerFaultId(props.item.Id)">
        <td>
          <v-icon  small  class="mr-2 red">radio_button_unchecked</v-icon>
        </td>
        <td><a>{{ props.item.fault }}</a></td>
        <td class="text-xs-right"><a>{{ props.item.element }}</a></td>
        <td class="text-xs-right"><a>{{ props.item.index }}</a></td>
        <td class="text-xs-right"><a>{{ props.item.component }}</a></td>
        <td class="text-xs-right"><a>{{ props.item.subComponent }}</a></td>
        <td class="text-xs-right"><a>{{ props.item.Date | dateFormatter }}</a></td>
      </tr>

    </template>
    <template slot="pageText" slot-scope="props">
       Faults {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
    </template>
    </v-data-table>
      {{currentFaultId}}

      {{currentInnerFaults}}
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
        // currentInnerFaultsNat: this.currentInnerFaults,
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
    computed:  {
      currentInnerFaultsNat: function () {
        let x=[];
        x.push(...this.currentInnerFaults);
        return x;
      }
    },
    watch: {
      currentFaultId() {
        this.currentInnerFaultsNat.length=0;
        this.currentInnerFaultsNat.push(...this.currentInnerFaults);
        // this.currentInnerFaults.length=0;
        // this.currentInnerFaults.push(...this.currentInnerFaults);
      },
    },
    filters: {
      dateFormatter: function (value) {
        if (!value) return '';
        let d = new Date(value);
        return d.toLocaleString();
      }
    },
    methods: {
      selectedInnerFaultId: function( i ) {
        console.log("hiiii "+ i );
        this.$emit('update:currentInnerFaultId', i)
      }
    },
    mounted() {
      this.$watch('currentInnerFaultsNat.length', function(n, o) {
        this.currentInnerFaultsNat.length=0;
        this.currentInnerFaultsNat.push(...this.currentInnerFaults);
      });

    }
  }
</script>

<style scoped>
  a {
    color: white;
  }

</style>
