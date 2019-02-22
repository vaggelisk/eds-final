<template>
  <v-container fluid grid-list-md>
    <v-layout row >
      <v-flex d-flex md4>
        <v-card style="background-color: rgb(42,42,42);">
          <div v-for="(item, index) in currentFaults"
              v-bind:item="item"
              v-bind:index="index"
              v-bind:key="index" >
            <v-card v-if="currentFaultId===index" style="background-color: rgb(66, 66, 66);margin:5px;" >
              <v-card-actions  @click="selectedTab( index ) " >
                  <GridCard  v-bind:currentFault="item" />
              </v-card-actions>
            </v-card>
            <v-card   v-else  style="background-color: rgb(31, 31, 31);margin:7px;" >
              <v-card-actions  @click="selectedTab( index )"  >
                <GridCard v-bind:currentFault="item" />
              </v-card-actions>
            </v-card>
          </div>
          <!--<div >{{ currentInnerFaultId }} vag </div>-->
        </v-card>
      </v-flex>
      <v-flex d-flex md8>
        <v-layout column>
          <v-flex  md5>
            <v-layout row>
              <v-flex d-flex md4>
                <v-card d-flex style="background-color: rgb(42,42,42);">
                  <PossibleCauses
                    v-bind:current-inner-fault-id.sync="currentInnerFaultId"
                    v-bind:current-fault-id="currentFaultId"
                    v-bind:current-inner-faults="currentInnerFaults"
                  />
                </v-card>
              </v-flex>
              <v-flex d-flex md8>
                  <FaultDetails
                    v-bind:engMap="engMap"
                    v-bind:faultData="selInnFault"
                    v-bind:aggrData="selAggrFault"
                  />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex  md5>
            <v-card style="background-color: rgb(42,42,42);">
              <Grid
                  v-bind:current-inner-fault-id.sync="currentInnerFaultId"
                  v-bind:current-fault-id="currentFaultId"
                  v-bind:current-inner-faults="currentInnerFaults"
                  />
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Grid           from    "../Controls/Grid";
  import GridCard       from    "../Controls/GridCard";
  import PossibleCauses from    "./PossibleCauses";
  import FaultDetails   from    "../Controls/FaultDetails";
  import {globalStore}    from "../../main.js"


  export default {
    name: "CurrentFaults",
    components: {PossibleCauses, Grid, GridCard, FaultDetails},
    props: {
      currentFaults: Array,
    },
    data: function() {
      return {
        currentFaultId:      this.currentFaults[0].Id,
        currentInnerFaultId: this.currentFaults[0].events[0].Id,
        selInnFault : this.currentFaults[0].events[0],
        selAggrFault : this.currentFaults[0],
        engMap : {}
      }
    },
    computed:  {
      currentInnerFaults: function () {
        let x=[];
        x.push(...this.currentFaults[0].events);
        return x;
      }
    },
    methods: {
      selectedTab: function( i ) {
        console.log("selTab");
        this.currentFaultId = this.currentFaults[i].Id;
        console.log(this.currentFaultId);
        console.log(i);
        this.currentInnerFaults.length = 0;
        this.currentInnerFaults.push(...this.currentFaults[i].events);
        console.log(this.currentFaults[i].events)
      },
    },
    mounted() {
      this.engMap = globalStore.engMap;
    },
    watch:
    {
      currentInnerFaultId: function(innFaultId)
      {
        var selected = this.currentFaults.filter(function(item){
          return item.Id == this.currentFaultId;
        }, this);

        this.selAggrFault = selected[0];

        var selInnFault = selected[0].events.filter(function(item){
          return item.Id ==innFaultId;
        }, this);

        this.selInnFault = selInnFault[0];

      }
    }

}
</script>

<style scoped>

</style>


