<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex md8>
        <v-layout column wrap>
          <v-flex d-flex md8>
            <v-card dark>
              <Schematic v-if="points"
                v-bind:schematicSource="schematicSource"
                v-bind:points="points"
                v-bind:initWidth="initWidth"
                v-bind:initHeight="initHeight"
                v-bind:idName="idName"/>
            </v-card>
          </v-flex>
          <v-flex d-flex md4>
            <v-card dark/>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md4>    
        <v-layout column wrap>
          <v-flex d-flex md6>
            <v-card dark/>
          </v-flex>
          <v-flex d-flex md3> 
            <v-layout row wrap>
               <v-flex d-flex md6> 
                 <v-card dark/>
               </v-flex>
               <v-flex d-flex md6> 
                 <v-card dark/>
               </v-flex>
            </v-layout>           
          </v-flex>
          <v-flex d-flex md3> 
            <v-layout row wrap>
               <v-flex d-flex md6> 
                 <v-card dark/>
               </v-flex>
               <v-flex d-flex md6> 
                 <v-card dark/>
               </v-flex>
            </v-layout>           
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
   import Schematic  from "../Controls/Schematic";

    export default {
      name: "GasAdmission",
      components: {
       Schematic
      },
      data: function() {
        return {
          schematicSource: require('../../assets/gas-admission-schematic-dark.png'),
          points: {
            "Gas Admission Valve Exhaust Side": {x:596, y:723, color:0, selected:false, events:[]},
            "Knock Sensor": {x:1015, y:443, color:0, selected:false, events:[]},
            "Piston Underside Sensor": {x:738, y:1004, color:0, selected:false, events:[]},
            "Pilot Fuel Injectors": {x:702, y:382, color:0, selected:false, events:[]},
            "Gas Admission Valve Fuel Side": {x:1127, y:723, color:0, selected:false, events:[]}},        
          initWidth: 1820,
          initHeight: 1134,
          idName: "GasAdmission"
        };
      },
      mounted() {
        }
      }
</script>

<style scoped>

</style>