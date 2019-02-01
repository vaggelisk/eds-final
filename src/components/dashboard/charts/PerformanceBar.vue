<template>
  <v-card style="height: 100%; width : 100%; background-color: rgb(42,42,42);height:250px;">
      <v-card-title  style="height: 10%; width : 100%;" primary class="title">Performance parameters</v-card-title>
      <v-card-actions style="height: 90%; width : 100%;">
        <dx-chart  id="chart" style="width : 100%; height:100%;"
                   :dataSource="performanceParamData" 
                   :customize-point="customizePoint"
                   :redraw-on-resize="true" >
          <dx-animation :enabled="false"/>
          <dx-legend :visible="false"/>  
          <dx-value-axis>
              <dx-grid color="rgb(67,67,67)"/>
          </dx-value-axis>                              
          <dx-series
                  type="bar"
                  argument-field="label"
                  value-field="val"
                  name="Values"/>
        </dx-chart>
      </v-card-actions>
    </v-card>
</template>

<script>
import DxChart, {
    DxArgumentAxis,
    DxSeries,
    DxPoint,
    DxValueAxis,
    DxAnimation,
    DxLegend,
    DxCommonAxisSettings, 
    DxGrid
} from 'devextreme-vue/chart';

export default {
  name: "PerformanceBar",
  components: {
      DxChart,
      DxArgumentAxis,
      DxSeries,
      DxPoint,
      DxValueAxis,
      DxAnimation,
      DxLegend,
      DxCommonAxisSettings, 
      DxGrid
  },
  props: {
    performanceParamData: Array
  },
  data: function() {
    return {
    };
  },
  methods: {
    customizePoint(arg) {
      if (arg.data.color == "red") return { color : '#cd3940'};
      else return { color: '#3cab30'};
    }
  },
  mounted() {
  }
};
</script>

<style scoped></style>
