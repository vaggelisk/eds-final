<template>
  <v-container fluid grid-list-md>


    <a style="color: white">

    <v-layout row wrap >
      <v-flex  xs12 sm3 md1>
        <v-card-title>
          <v-icon  class="mr-2" :style='"color: "+this.colorRGB+";"'> information </v-icon>
        </v-card-title>
      </v-flex>

      <v-flex  xs12 sm6 md8>
        <v-card-text>
            <div class="subheading"> {{ currentFault.fault }} {{currentFault.color}} </div>
            <div class="body-1 black--text" > Fault </div>
        </v-card-text>
      </v-flex>

      <v-flex xs12 sm3 md3>

        <!--<CircGauge v-bind:value="colorsEngineState[n-1][0]*100"-->
                   <!--v-bind:labelText="n"-->
                   <!--v-bind:color="colorsEngineState[n-1][1]"-->
        <!--/>-->
         <CircGauge
           v-bind:value="95"
           v-bind:labelText="currentFault.index.toString()"
           v-bind:color="currentFault.color"
          />


        <!--<v-card-text class="black&#45;&#45;text">-->
          <!--{{ currentFault.element }}-->

        <!--</v-card-text>-->
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
  import CircGauge                from  "../Controls/CircGauge";
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
        CircGauge
      },
      props:  {
        currentFault: Object,
      },
      data() {
        return {
          // colorRGB: 'rgb(60, 171, 48)',
          message: `vagelis`,
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
        }
      },
      computed: {
        colorRGB: function () {
                if (this.currentFault.color==0) return 'rgb(60, 171, 48)';
                else if (this.currentFault.color==10) return 'rgb(255, 184, 29)';
                else return 'rgb(205, 57, 64)';
        },
      },
      filters: {
        capitalize: function (value) {
          if (!value) return '';
          value = value.toString();
          return value.charAt(0).toUpperCase() + value.slice(1)
        },
        // colorFormatter: function (v) {
        //   if (v==0) return 'rgb(60, 171, 48)';
        //   else if (v==10) return 'rgb(255, 184, 29)';
        //   else return  'rgb(205, 57, 64)';
        // },
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


