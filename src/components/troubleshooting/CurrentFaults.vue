<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>


      <v-flex  xs12 sm6 md4>
        <div   v-for="(item, index) in currentFaults"
             v-bind:item="item"
             v-bind:index="index"
             v-bind:key="index" >
          <v-card v-if="currentFaultId===index" color="grey darken-2"   >
            <v-card-actions  @click="selectedTab( index ) " >
                <GridCard2  v-bind:currentFault="item" />
            </v-card-actions>
          </v-card>
          <v-card   v-else  >
            <v-card-actions  @click="selectedTab( index )" >
              <GridCard2  v-bind:currentFault="item" />
            </v-card-actions>
          </v-card>
        </div>

       <!--<div v-bind:currentInnerFaultId.sync="currentInnerFaultId">{{ currentInnerFaultId }} vag</div>-->
        <div >{{ currentFaultId }} </div>
        <div >{{ currentInnerFaultId }} vag</div>
        <!--<div>{{currentInnerFaults}}</div>-->

      </v-flex>

      <v-flex  md8>
        <v-layout row wrap>

          <v-flex d-flex md4>
            <v-card  dark>
              <PossibleCauses  v-bind:current-inner-fault-id.sync="currentInnerFaultId"
                               v-bind:current-fault-id="currentFaultId"
                               v-bind:current-inner-faults="currentInnerFaults"
              />
            </v-card>
          </v-flex>


          <v-flex d-flex md8>
            <v-layout row wrap>
              <v-flex
                v-for="n in 2"
                :key="n"
                d-flex
                xs12
              >
                <v-card dark >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>


          <v-flex d-flex>
            <v-layout >
              <v-flex sm12 d-flex>

                <v-card   dark>
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
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
    import Grid           from "../Controls/Grid";
    import GridCard       from "../Controls/GridCard";
    import GridCard2      from "../Controls/GridCard2";
    import PossibleCauses from "./PossibleCauses";


    export default {
      name: "CurrentFaults",
      components: {PossibleCauses, GridCard, Grid, GridCard2, },
      props: {
        currentFaults: Array,
      },
      data: function() {
        return {
          currentFaultId: 0,
          currentInnerFaultId: 0,
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
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
          this.currentFaultId = i;
          this.currentInnerFaults.length = 0;
          this.currentInnerFaults.push(...this.currentFaults[i].events);
        }
      },
      mounted() {

      }

    }
</script>

<style scoped>

</style>


