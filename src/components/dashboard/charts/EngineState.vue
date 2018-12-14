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


          <!--<div class="speed-value">-->
            <!--<span><h4>{{ speedValue }}% </h4></span>-->
          <!--</div>-->
          <v-layout style="position: relative; top: -25%" >

            <v-flex xs2>
              <div class="speed-value-1" >
                <span><h4> 1 </h4></span>
              </div>
              <dx-circular-gauge :value.sync="speedValue">
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
                            :end-value.sync="speedValue" color="green"></dx-range>

                </dx-range-container>
              </dx-circular-gauge>
            </v-flex>

            <!--<v-flex xs2>-->
              <!--<div class="speed-value-2" >-->
                <!--<span><h4> 2 </h4></span>-->
              <!--</div>-->
            <!--<dx-circular-gauge  :value="speedValue">-->
              <!--<dx-size :width="120" />-->

              <!--<dx-value-indicator-->
                 <!--spindleGapSize=0-->
                <!--type="disable"-->
                <!--color="transparent"-->
              <!--/>-->
              <!--<dx-geometry-->
                <!--:start-angle="270"-->
                <!--:end-angle="271"-->
              <!--/>-->
              <!--<dx-scale-->
                <!--:start-value="0"-->
                <!--:end-value="100"-->
                <!--:tick-interval="100">-->
                                <!--<dx-label :visible=false></dx-label>-->
              <!--</dx-scale>-->
              <!--<dx-range-container >-->
                <!--<dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>-->
                <!--&lt;!&ndash;<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>&ndash;&gt;-->

              <!--</dx-range-container>-->
            <!--</dx-circular-gauge>-->
            <!--</v-flex>-->

            <!--<v-flex xs2>-->
              <!--<div class="speed-value-3" >-->
                <!--<span><h4> 3 </h4></span>-->
              <!--</div>-->
            <!--<dx-circular-gauge :value="speedValue">-->
              <!--<dx-size :width="120" />-->

              <!--<dx-value-indicator-->
                <!--spindleGapSize=0-->
                <!--type="disable"-->
                <!--color="transparent"-->
              <!--/>-->
              <!--<dx-geometry-->
                <!--:start-angle="270"-->
                <!--:end-angle="271"-->
              <!--/>-->
              <!--<dx-scale-->
                <!--:start-value="0"-->
                <!--:end-value="100"-->
                <!--:tick-interval="100" >-->
                                <!--<dx-label :visible=false></dx-label>-->
              <!--</dx-scale>-->
              <!--<dx-range-container >-->
                <!--<dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>-->
                <!--&lt;!&ndash;<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>&ndash;&gt;-->

              <!--</dx-range-container>-->
            <!--</dx-circular-gauge>-->
            <!--</v-flex>-->

            <!--<v-flex xs2>-->
              <!--<div class="speed-value-4" >-->
                <!--<span><h4> 4 </h4></span>-->
              <!--</div>-->
            <!--<dx-circular-gauge :value="speedValue">-->
              <!--<dx-size :width="120" />-->

              <!--<dx-value-indicator-->
                 <!--spindleGapSize=0-->
                <!--type="disable"-->
                <!--color="transparent">-->
                                <!--<dx-label :visible=false></dx-label>-->
              <!--</dx-value-indicator>-->
              <!--<dx-geometry-->
                <!--:start-angle="270"-->
                <!--:end-angle="271"-->
              <!--/>-->
              <!--<dx-scale-->
                <!--:start-value="0"-->
                <!--:end-value="100"-->
                <!--:tick-interval="100">-->
                <!--<dx-label :visible=false></dx-label>-->

              <!--</dx-scale>-->

              <!--<dx-range-container >-->
                <!--<dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>-->

              <!--</dx-range-container>-->
            <!--</dx-circular-gauge>-->
            <!--</v-flex>-->

            <!--<v-flex xs2>-->
              <!--<div class="speed-value-5" >-->
                <!--<span><h4> 5 </h4></span>-->
              <!--</div>-->
            <!--<dx-circular-gauge :value="speedValue">-->
              <!--<dx-size :width="120" />-->

              <!--<dx-value-indicator-->
                <!--spindleGapSize=0-->
                <!--type="disable"-->
                <!--color="transparent"-->
              <!--/>-->
              <!--<dx-geometry-->
                <!--:start-angle="270"-->
                <!--:end-angle="271"-->
              <!--/>-->
              <!--<dx-scale-->
                <!--:start-value="0"-->
                <!--:end-value="100"-->
                <!--:tick-interval="100">-->
                <!--<dx-label :visible=false></dx-label>-->
              <!--</dx-scale>-->
              <!--<dx-range-container >-->
                <!--<dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>-->

              <!--</dx-range-container>-->
            <!--</dx-circular-gauge>-->
            <!--</v-flex>-->

            <!--<v-flex xs2>-->
              <!--<div class="speed-value-6" >-->
                <!--<span><h4> 6 </h4></span>-->
              <!--</div>-->
              <!--<dx-circular-gauge :value="speedValue">-->
                <!--<dx-size :width="120" />-->

                <!--<dx-value-indicator-->
                   <!--spindleGapSize=0-->
                  <!--type="disable"-->
                  <!--color="transparent"-->
                <!--/>-->
                <!--<dx-geometry-->
                  <!--:start-angle="270"-->
                  <!--:end-angle="271"-->
                <!--/>-->
                <!--<dx-scale-->
                  <!--:start-value="0"-->
                  <!--:end-value="100"-->
                  <!--:tick-interval="100">-->
                  <!--<dx-label :visible=false></dx-label>-->
                <!--</dx-scale>-->
              <!--<dx-range-container >-->
                  <!--<dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>-->

                <!--</dx-range-container>-->
              <!--</dx-circular-gauge>-->
            <!--</v-flex>-->

          <!--</v-layout>-->

        <!--</v-flex>-->
      <!--</v-layout>-->

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

              {{colorsEngineStateC[0]}}  {{colorsEngineState[0]}} {{speedValue}} {{counter}}
          </v-layout>
        </v-flex>


      </v-layout>

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
          textTitle: "",
          colorsEngineStateC: this.colorsEngineState,
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
    computed() {

    },
    mounted () {
      this.loading = false;
      this.textTitle = this.speedValue.toString() + "%";
      this.speedValue = this.colorsEngineState[0][0]*100;
      this.$watch('colorsEngineState[0][0]', function (newVal, ) {
        this.speedValue =  newVal*100;
      });
      this.speedValueArr.push( this.colorsEngineState[0][0]*100 );
      // this.$watch()
      console.log( this.speedValueArr[0] );


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

