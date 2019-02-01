<template>
  <v-container fluid grid-list-md>


    <a style="color: white">

    <v-layout row wrap >
      <v-flex  xs12 sm3 md1>
        <v-card-title>
          <!--<v-icon  class="mr-2 red" >fiber_manual_record_outlined</v-icon>-->
          <v-icon  class="mr-2 red" >radio_button_unchecked</v-icon>
        </v-card-title>
      </v-flex>

      <v-flex  xs12 sm6 md8>
        <v-card-text>
            <div class="subheading"> {{ currentFault.fault }} </div>
            <div class="body-1 black--text"> Fault </div>
        </v-card-text>

      </v-flex>

      <v-flex xs12 sm3 md3>
        <dx-circular-gauge :value="80">
          <dx-size :height="80" :width="80" />
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
          {{ currentFault.element }} {{currentFault.index}}
        </v-card-text>
       </v-flex>

     </v-layout >

    <v-layout row wrap>
       <v-flex d-flex>
          <v-card-text class="align-baseline">
            <div class="subheading">  28  </div>
            <div class="body-1 black--text">Occurences</div>
          </v-card-text>
          <v-card-text class="align-baseline"  md8>
            <div class="body-1"> {{ currentFault.startDate | dateFormatter   }}  </div>
            <div class="body-1 black--text">First appeared</div>
          </v-card-text>
          <v-card-text  class="align-baseline" >
            <div class="subheading">  {{ currentFault.component }} </div>
            <div class="body-1 black--text">Subsystem</div>
          </v-card-text>
        </v-flex>

     </v-layout>

    </a>


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
          message: `vagelis`,
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
        }
      },
      filters: {
        capitalize: function (value) {
          if (!value) return '';
          value = value.toString();
          return value.charAt(0).toUpperCase() + value.slice(1)
        },
        uppercase: function (value) {
          if (!value) return '';
          value = value.toString();
          return value.toUpperCase();
        },
        dateFormatter: function (value) {
          if (!value) return '';
          let d = new Date(value);
          return d.toLocaleString();
        }
      }
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


