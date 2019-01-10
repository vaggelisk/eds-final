<template>
  <v-responsive contain>
    <v-card-title primary class="title"><h5> Firing Pressure </h5></v-card-title>
    <v-flex d-flex>
      <p><em>[bar]</em> </p>

    <dx-chart
      id="chart"
      :data-source="dataFiringPressureC"
      :customize-point="customizePoint"
    >
      <dx-series
        argument-field="cylinder"
        value-field="value"
        name="My value"
        type="bar"
        color="#e7d19a"
      >

      </dx-series>
      <dx-value-axis
        :showZero="false"
        :visualRange="[60, 140]"
        :minorTickCount="4"
      >
        <dx-tick :visible="true"></dx-tick>
        <dx-minor-tick :visible="true"></dx-minor-tick>
      </dx-value-axis>

      <dx-crosshair
        :horizontal-line="false"
        :enabled="true"
        color="#949494"
        :width="1"
        dashStyle="solid">
       <!-- <dx-label
          :visible="true"
          backgroundColor="#949494">
          <dx-font
            color="#fff"
            :size="12">
          </dx-font>
        </dx-label>-->
      </dx-crosshair>



      <dx-tooltip
        :enabled="true"
        :customizeTooltip="customizeTooltip">
      </dx-tooltip>

      <dx-legend
        vertical-alignment="bottom"
        :visible="false"
      ></dx-legend>

    </dx-chart>
    </v-flex>
    <div style="margin-right: 20px; text-align: right"><em>Cylinders</em></div>

  </v-responsive>
</template>

<script>
  import { DxChart, DxSeries, DxLabel, DxValueAxis, DxGrid, DxTitle, DxLegend, DxTooltip, DxCrosshair, DxCrosshairLabel, DxTick, DxMinorTick } from 'devextreme-vue/chart';
  // import { dataFiringPressure } from './dataFiringPressure';

  export default {
    name: "BarChart",
    components: {
      DxChart, DxSeries, DxLabel, DxCrosshair, DxCrosshairLabel,
      DxValueAxis, DxGrid, DxTitle, DxLegend, DxTooltip, DxTick, DxMinorTick,
    },
    props: {
      dataFiringPressureC: Array,
      counter: Number,
    },
    computed: {
      // dataFiringPressure() {
      //   return this.dataFiringPressure;
      // }
    },
    methods: {
      customizePoint(arg) {
        if (arg.tag === 0) {
          return { color: '#05802a', hoverStyle: { color: '#05802a' } };
        }
        else if (arg.tag === 1) {
          return { color: '#ff212b', hoverStyle: { color: '#ff212b' } };
        }
      },

      customizeTooltip (arg) {
        return { html:  '<span style="height:8px; width:8px;background-color:green;" >'  + '</span>' +  ' Cylinder ' + arg.argumentText + ' : ' + arg.valueText  +  ' '} ;
      }
    },
    created() {
      // console.log(this.dataFiringPressureC)
    }
  }
</script>

<style scoped>
  #chart {
    height: 190px;
    width: 500%;
  }
  p {
    text-align: end;
    writing-mode: vertical-rl ;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
  }

</style>
