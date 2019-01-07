<template>
  <v-responsive contain>
    <v-card-title primary class="title"><h5> Firing Pressure </h5></v-card-title>
    <v-flex d-flex>
      <p><em>[bar]</em> </p>

    <dx-chart
      id="chart"
      :data-source="dataFiringPressure"
    >
      <dx-series
        argument-field="cylinder"
        value-field="oranges"
        name="My oranges"
        type="bar"
        color="#ffaa66"
      >

      </dx-series>
      <dx-value-axis  :showZero="false">
      </dx-value-axis>
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
    <div style="margin-right: 20px; text-align: right"><em >Cylinders</em></div>

  </v-responsive>
</template>

<script>
  import { DxChart, DxSeries, DxLabel, DxValueAxis, DxGrid, DxTitle, DxLegend, DxTooltip } from 'devextreme-vue/chart';
  import { dataFiringPressure } from './dataFiringPressure';

  export default {
    name: "FiringPressure",
    components: {
      DxChart, DxSeries, DxLabel,
      DxValueAxis, DxGrid, DxTitle, DxLegend, DxTooltip,
    },
    data: function()  {
      return {
        dataFiringPressure,
      };
    },
    methods: {
      customizeTooltip (arg) {
        return arg.value > 4 ? { html:  '<span style="height:8px; width:8px;background-color:green;" >'  + '</span>' +  ' Cylinder ' + arg.argumentText + ' : ' + arg.valueText  +  ' ' } : { }
      }
    }
  }
</script>

<style scoped>
  #chart {
    height: 320px;
    width: 500%;
  }
  p {
    text-align: end;
    writing-mode: vertical-rl ;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);

    /*text-orientation: sideways-right;*/
    /*text-orientation: sideways;*/
  }

</style>
