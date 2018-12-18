<template>
  <span>
    <div v-if='loading'>Loading...</div>
    <v-card-title primary class="title"> Engine State </v-card-title>
    <v-card-title class="subtitle"> Cylinders </v-card-title>

    <v-container
      contain
      grid-list-sm
    >

      <v-layout row wrap >

        <v-flex xs-12 >


          <v-layout style="position: relative; top: -25%" >

            <v-flex xs2>
              <div class="speed-value-1" >
                <span><h4> 1 </h4></span>
              </div>
              <dx-circular-gauge :value.sync="speedValueArr[0]">
                <dx-size :width="120" />

                <dx-value-indicator
                  spindleGapSize=0
                  type="disable"
                  color="transparent"
                />
                <dx-geometry
                  :start-angle="270"
                  :end-angle="271"
                />
                <dx-scale
                  :start-value="0"
                  :end-value="100"
                  :tick-interval="100">
                                  <dx-label :visible=false></dx-label>
                </dx-scale>
                <dx-range-container >
                  <dx-range :start-value="0"
                            :end-value.sync="speedValueArr[0]"
                            :color="colors[0]"></dx-range>

                </dx-range-container>
              </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-2" >
                <span><h4> 2 </h4></span>
              </div>
            <dx-circular-gauge  :value.sync="speedValueArr[1]">
              <dx-size :width="120" />

              <dx-value-indicator
                 spindleGapSize=0
                type="disable"
                color="transparent"
              />
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100">
                                <dx-label :visible=false></dx-label>
              </dx-scale>
              <dx-range-container >
                <dx-range :start-value="0"
                          :end-value.sync="speedValueArr[1]"
                          :color="colors[1]"></dx-range>
                <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-3" >
                <span><h4> 3 </h4></span>
              </div>
            <dx-circular-gauge :value.sync="speedValueArr[2]">
              <dx-size :width="120" />

              <dx-value-indicator
                spindleGapSize=0
                type="disable"
                color="transparent"
              />
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100" >
                                <dx-label :visible=false></dx-label>
              </dx-scale>
              <dx-range-container >
                <dx-range :start-value="0"
                          :end-value.sync="speedValueArr[2]"
                          :color="colors[2]"></dx-range>
                <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-4" >
                <span><h4> 4 </h4></span>
              </div>
            <dx-circular-gauge :value.sync="speedValueArr[3]">
              <dx-size :width="120" />

              <dx-value-indicator
                 spindleGapSize=0
                type="disable"
                color="transparent">
                                <dx-label :visible=false></dx-label>
              </dx-value-indicator>
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100">
                <dx-label :visible=false></dx-label>

              </dx-scale>

              <dx-range-container >
                <dx-range :start-value="0"
                          :end-value.sync="speedValueArr[3]"
                          :color="colors[3]"></dx-range>

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-5" >
                <span><h4> 5 </h4></span>
              </div>
            <dx-circular-gauge :value.sync="speedValueArr[4]">
              <dx-size :width="120" />

              <dx-value-indicator
                spindleGapSize=0
                type="disable"
                color="transparent"
              />
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100">
                <dx-label :visible=false></dx-label>
              </dx-scale>
              <dx-range-container >
                <dx-range :start-value="0"
                          :end-value.sync="speedValueArr[4]"
                          :color="colors[4]" ></dx-range>

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-6" >
                <span><h4> 6 </h4></span>
              </div>
              <dx-circular-gauge :value.sync="speedValueArr[5]">
                <dx-size :width="120" />

                <dx-value-indicator
                   spindleGapSize=0
                  type="disable"
                  color="transparent"
                />
                <dx-geometry
                  :start-angle="270"
                  :end-angle="271"
                />
                <dx-scale
                  :start-value="0"
                  :end-value="100"
                  :tick-interval="100">
                  <dx-label :visible=false></dx-label>
                </dx-scale>
              <dx-range-container >
                  <dx-range :start-value="0"  :end-value.sync="speedValueArr[5]"
                            :color="colors[5]"></dx-range>

                </dx-range-container>
              </dx-circular-gauge>
            </v-flex>

          </v-layout>

        </v-flex>
      </v-layout>

      <!--<v-layout row wrap align-center  >-->

        <!--<v-flex xs12 text-xs-center s>-->
          <!--<v-layout class="buttons"  >-->
              <!--<v-btn large flat color="white">Turbines</v-btn>-->
                        <!--<hr style="height:8px;border:none;color:green;background-color:green;" />-->

              <!--<v-btn large flat color="white">Compressors</v-btn>-->
                        <!--<hr style="height:8px;border:none;color:green;background-color:green;" />-->

              <!--<v-btn large flat color="white">Air Coolers</v-btn>-->
                        <!--<hr style="height:8px;border:none;color:green;background-color:green;" />-->

              <!--<v-btn large flat color="white">Air Filters</v-btn>-->


          <!--</v-layout>-->
        <!--</v-flex>-->

        <v-layout class="buttons"  row wrap>
          <v-flex  xs3>
            <v-btn block color="secondary" dark> Turbines </v-btn>
            <hr :style="'height:8px; border:none; color:' + colorSubsystemTurbine + '; background-color:' + colorSubsystemTurbine +'; width:' + colorsSubsystemTurbine[0]*100+ '%;' " />

          </v-flex>
          <v-flex  xs3>
            <v-btn block color="secondary" dark> Compressors </v-btn>
           <hr :style="'height:8px; border:none; color:' + colorSubsystemCompressor + '; background-color:' + colorSubsystemCompressor +'; width:' + colorsSubsystemCompressor[0]*100+ '%;' " />

          </v-flex>
          <v-flex  xs3>
            <v-btn block color="secondary" dark> Air Coolers </v-btn>
           <hr :style="'height:8px; border:none; color:' + colorSubsystemAirCooler + '; background-color:' + colorSubsystemAirCooler +'; width:' + colorsSubsystemAirCooler[0]*100+ '%;' " />
          </v-flex>
          <v-flex  xs3>
            <v-btn block color="secondary" dark> Air Filters </v-btn>
            <hr :style="'height:8px; border:none; color:' + colorSubsystemAirFilter + '; background-color:' + colorSubsystemAirFilter +'; width:' + colorsSubsystemAirFilter[0]*100+ '%;' " />

          </v-flex>
        </v-layout>


      <!--</v-layout>-->

    </v-container>

  </span>
</template>

<script>
import Chart             from 'chart.js'
import DxCircularGauge, {
 DxSize,
 DxValueIndicator,
 DxGeometry,
 DxScale,
 DxRangeContainer,
 DxRange,
 DxTitle,
 DxLabel
} from "devextreme-vue/circular-gauge"

import GaugeIndicator from "./GaugeIndicator"


export default {
    name: "EngineDoughnut",
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

      GaugeIndicator,
    },

    data: function() {
        return {
          speedValue: 91,
          speedValueArr: [],
          colors: [],
          textTitle: "",
          colorSubsystemTurbine: "",
          colorSubsystemCompressor: "",
          colorSubsystemAirCooler: "",
          colorSubsystemAirFilter: "",
        }
    },
    methods: {
        customizeText(arg) {
          return arg.valueText + "%";
        },
        createChart2(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            const myChart2 = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
            });
        }
    },

    mounted () {
      if (this.colorsSubsystemTurbine[1]===0){
        this.colorSubsystemTurbine = "green" ;
      } else if (this.colorsSubsystemServoOil[1]===10 ){
        this.colorSubsystemTurbine = "orange" ;
      } else {
        this.colorSubsystemTurbine = "red" ;
      }
      if (this.colorsSubsystemAirFilter[1]===0){
        this.colorSubsystemAirFilter = "green" ;
      } else if (this.colorsSubsystemAirFilter[1]===10 ){
        this.colorSubsystemAirFilter = "orange" ;
      } else {
        this.colorSubsystemAirFilter = "red" ;
      }
      if (this.colorsSubsystemAirCooler[1]===0){
        this.colorSubsystemAirCooler = "green" ;
      } else if (this.colorsSubsystemAirCooler[1]===10 ){
        this.colorSubsystemAirCooler = "orange" ;
      } else {
        this.colorSubsystemAirCooler = "red" ;
      }
      if (this.colorsSubsystemCompressor[1]===0){
        this.colorSubsystemCompressor = "green" ;
      } else if (this.colorsSubsystemCompressor[1]===10 ){
        this.colorSubsystemCompressor = "orange" ;
      } else {
        this.colorSubsystemCompressor = "red" ;
      }
      for (let i = 0; i < 6; i++) {
        this.$set(this.speedValueArr, i, this.colorsEngineState[i][0] * 100);
        if (this.colorsEngineState[i][1]===0){
          this.$set(this.colors, i, "green");
        } else if (this.colorsEngineState[i][1]===10 ){
          this.$set(this.colors, i, "orange");
        } else {
          this.$set(this.colors, i, "red");
        }
      }
      this.loading = false;
      this.textTitle = this.speedValue.toString() + "%";
      this.speedValue = this.colorsEngineState[0][0]*100;
      this.$watch('colorsSubsystemTurbine', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemTurbine = "green" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemTurbine = "orange" ;
        } else {
          this.colorSubsystemTurbine = "red" ;
        }
      }, {deep:true});
      this.$watch('colorsSubsystemAirFilter', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemAirFilter = "green" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemAirFilter = "orange" ;
        } else {
          this.colorSubsystemAirFilter = "red" ;
        }
      }, {deep:true});
      this.$watch('colorsSubsystemAirCooler', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemAirCooler = "green" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemAirCooler = "orange" ;
        } else {
          this.colorSubsystemAirCooler = "red" ;
        }
      }, {deep:true});
      this.$watch('colorsSubsystemCompressor', function(newVal) {
        if (newVal[1]===0){
          this.colorSubsystemCompressor = "green" ;
        } else if (newVal[1]===10 ){
          this.colorSubsystemCompressor = "orange" ;
        } else {
          this.colorSubsystemCompressor = "red" ;
        }
      }, {deep:true});
      this.$watch('colorsEngineState', function (newVal, ) {
        this.speedValue =  newVal[0][0]*100;
        for (let i = 0; i < 6; i++) {
          this.$set(this.speedValueArr, i, newVal[i][0] * 100);
          if (newVal[i][1]===0){
            this.$set(this.colors, i, "green");
          } else if (newVal[i][1]===10 ){
            this.$set(this.colors, i, "orange");
          } else {
            this.$set(this.colors, i, "red");
          }
        }
      }, {deep:true});
    }
}
</script>

<style scoped>

  .speed-value-1 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 6%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-1 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-2 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 23%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-2 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-3 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 39%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-3 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
   .speed-value-4 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 56%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-4 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-5 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 72%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-5 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-6 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 89%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-6 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .buttons {
    position: relative;
    bottom: 130px !important;
  }

</style>

