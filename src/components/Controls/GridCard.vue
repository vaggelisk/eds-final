<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex  xs12 sm6 md1>
        <v-card-title>
          <v-icon  class="mr-2 green" >check_circle_outline</v-icon>
        </v-card-title>
      </v-flex>

      <v-flex  xs12 sm6 md8>
        <v-card-text>
            <div class="subheading"> {{ currentFault.fault }} </div>
            <div class="body-1 black--text"> Fault </div>
        </v-card-text>
        <v-flex d-flex>
          <v-card-text class="align-baseline">
            <div class="headline">  28  </div>
            <div class="body-1 black--text">Occurences</div>
          </v-card-text>
          <v-card-text class="align-baseline">
            <div class="body-2">  {{currentFault.startDate}}  </div>
            <div class="body-1 black--text">First appeared</div>
          </v-card-text>
        </v-flex>
      </v-flex>



      <v-flex  xs1 sm1 md3>
          <div class="gauge-value-1" >
            <span> {{currentFault.index}} </span>
          </div>
          <dx-circular-gauge :value="80">
            <dx-size :height="40" :width="60" />

            <dx-value-indicator
              :spindleGapSize=0
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
                          :end-value="80"
                          color="green"></dx-range>
            </dx-range-container>
          </dx-circular-gauge>
        <v-card-text class="black--text">
          {{ currentFault.element }}
        </v-card-text>

        <v-card-text >
          <div class="subheading">  {{ currentFault.component }} </div>
          <div class="body-1 black--text">Subsystem</div>
        </v-card-text>
      </v-flex>
    </v-layout>

  </v-container>
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
    DxLabel
  } from "devextreme-vue/circular-gauge";

    export default {
      name: "GridCard",
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

      },
      props:  {
        currentFault: Object,
      },
      data() {
        return {
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
        }
      },
    }
</script>

<style scoped>

  .gauge-value-1 {
    position: absolute;
    /*!*border: 2px solid #f05b41;*!*/
    /*!*border-radius: 50%;*!*/
    /*!*width: 220px;*!*/
    /*height: 90px;*/
    right: 21%;
    top: 18%;
    /*line-height: 100px;*/
  }

  .gauge-value-1 > span {
    position: relative;
    /*font-size: 50px;*/
    font-weight: lighter;
    color: #fff7d7;
  }

</style>


