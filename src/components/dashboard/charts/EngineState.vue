<template>  
  <v-card style="height: 100%; width : 100%; background-color: rgb(42,42,42);">
    <v-card-title style="height: 10%; width : 100%;" primary class="title"> Engine State </v-card-title>
    <v-card-title style="height: 5%; width : 100%; " class="title"> Cylinders </v-card-title>
    <v-card-actions style="height: 85%; width : 100%;">
      <v-container fluid grid-list-md style="height: 100%; width : 100%; margin:0px;padding:0px;">
        <v-layout column wrap style="height: 100%; width : 100%;" >
          <v-flex d-flex md8 fill-width>
             <v-layout row wrap >
              <v-flex v-for="n in 6" :key="n" d-flex md2>
                <CircGauge v-bind:value="colorsEngineState[n-1][0]*100"
                          v-bind:labelText="n"
                          v-bind:color="colorsEngineState[n-1][1]"
                           />
              </v-flex>              
            </v-layout>
          </v-flex>
          <v-flex d-flex md4 fill-width>
             <v-layout row wrap>
                <v-flex md3>
                  <v-layout column wrap style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Turbines </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorSubsystemTurbine + '; background-color:' + colorSubsystemTurbine +'; width:' + colorsSubsystemTurbine[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex md3>
                  <v-layout column wrap style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Compressors </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorSubsystemCompressor + '; background-color:' + colorSubsystemCompressor +'; width:' + colorsSubsystemCompressor[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex md3>
                  <v-layout column wrap style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Air Coolers </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorSubsystemAirCooler + '; background-color:' + colorSubsystemAirCooler +'; width:' + colorsSubsystemAirCooler[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex md3>
                  <v-layout column wrap style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Air Filters </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorSubsystemAirFilter + '; background-color:' + colorSubsystemAirFilter +'; width:' + colorsSubsystemAirFilter[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>           

          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { DxCircularGauge,
 DxSize,
 DxValueIndicator,
 DxGeometry,
 DxScale,
 DxRangeContainer,
 DxRange,
 DxTitle,
 DxTick,
 DxLabel
} from "devextreme-vue/circular-gauge"

import CircGauge                from "../../Controls/CircGauge";

export default {
    name: "EngineState",
    props: {
      childEngineDataLoaded: Boolean,
      engineKpiData: Object,
      colorsEngineState: Array,
      colorsSubsystemTurbine: Array,
      colorsSubsystemCompressor: Array,
      colorsSubsystemAirCooler: Array,
      colorsSubsystemAirFilter: Array,
      counter: Number,
    },
    components: {
      DxCircularGauge,
      DxSize,
      DxValueIndicator,
      DxGeometry,
      DxScale,
      DxRangeContainer,
      DxRange,
      DxTitle,
      DxLabel,
      DxTick,
      CircGauge
    },

    data: function() {
        return {
          textTitle: "",
          colorSubsystemTurbine: "",
          colorSubsystemCompressor: "",
          colorSubsystemAirCooler: "",
          colorSubsystemAirFilter: "",
        }
    },
    
    methods:
    {
      hoverButton(event)
      {
        event.srcElement.classList.add("subSysBtnHover");
      }, 
      leaveButton(event)
      {
        event.srcElement.classList.remove("subSysBtnHover");
      }
    },

    mounted () {
      if (this.colorsSubsystemTurbine[1]===0){
        this.colorSubsystemTurbine = "rgb(60, 171, 48)" ;
      } else if (this.colorsSubsystemServoOil[1]===10 ){
        this.colorSubsystemTurbine = "rgb(255, 184, 29)" ;
      } else {
        this.colorSubsystemTurbine = "rgb(205, 57, 64)" ;
      }
      if (this.colorsSubsystemAirFilter[1]===0){
        this.colorSubsystemAirFilter = "rgb(60, 171, 48)" ;
      } else if (this.colorsSubsystemAirFilter[1]===10 ){
        this.colorSubsystemAirFilter = "rgb(255, 184, 29)" ;
      } else {
        this.colorSubsystemAirFilter = "rgb(205, 57, 64)" ;
      }
      if (this.colorsSubsystemAirCooler[1]===0){
        this.colorSubsystemAirCooler = "rgb(60, 171, 48)" ;
      } else if (this.colorsSubsystemAirCooler[1]===10 ){
        this.colorSubsystemAirCooler = "rgb(255, 184, 29)" ;
      } else {
        this.colorSubsystemAirCooler = "rgb(205, 57, 64)" ;
      }
      if (this.colorsSubsystemCompressor[1]===0){
        this.colorSubsystemCompressor = "rgb(60, 171, 48)" ;
      } else if (this.colorsSubsystemCompressor[1]===10 ){
        this.colorSubsystemCompressor = "rgb(255, 184, 29)" ;
      } else {
        this.colorSubsystemCompressor = "rgb(205, 57, 64)" ;
      }
     
      this.loading = false;
      this.$watch('colorsSubsystemTurbine', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemTurbine = "rgb(60, 171, 48)" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemTurbine = "rgb(255, 184, 29)" ;
        } else {
          this.colorSubsystemTurbine = "rgb(205, 57, 64)" ;
        }
      }, {deep:true});
      this.$watch('colorsSubsystemAirFilter', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemAirFilter = "rgb(60, 171, 48)" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemAirFilter = "rgb(255, 184, 29)" ;
        } else {
          this.colorSubsystemAirFilter = "rgb(205, 57, 64)" ;
        }
      }, {deep:true});
      this.$watch('colorsSubsystemAirCooler', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemAirCooler = "rgb(60, 171, 48)" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemAirCooler = "rgb(255, 184, 29)" ;
        } else {
          this.colorSubsystemAirCooler = "rgb(205, 57, 64)" ;
        }
      }, {deep:true});
      this.$watch('colorsSubsystemCompressor', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemCompressor = "rgb(60, 171, 48)" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemCompressor = "rgb(255, 184, 29)" ;
        } else {
          this.colorSubsystemCompressor = "rgb(205, 57, 64)" ;
        }
      }, {deep:true});      
    }
}
</script>

<style scoped>

.subSysBtn
{
  height:100%;
  width:100%;
  text-transform: none !important;  
  font-size: 25px;  
  font-style: normal;  
}
.subSysBtnHover
{
   background-color:rgb(0,0,0); 
}


</style>

