<template>
    <v-responsive>
      <dx-chart
        id="chart"
        :dataSource="weatherData"
        defaultPane="bottomPane"
        title="Weather in Glendale, CA">
        <dx-series
          pane="topPane"
          color="#b0daff"
          type="rangearea"
          rangeValue1Field="minT"
          rangeValue2Field="maxT"
          name="Monthly Temperature Ranges, °C">
        </dx-series>
        <dx-series
          pane="middlePane"
          color="#b0daff"
          type="rangearea"
          rangeValue1Field="minT"
          rangeValue2Field="maxT"
          name="Monthly Temperature Ranges, °C">
        </dx-series>
        <dx-series
          pane="middlePane"
          valueField="avgT"
          name="Average Temperature, °C">
          <dx-label
            :visible="true" >
            <!--:customizeText="temperatureCustomizeText">-->
          </dx-label>
        </dx-series>
         <dx-series
          pane="firingPressure"
          valueField="avgT"
          name="Average Temperature, °C">
          <dx-label
            :visible="true" >
            <!--:customizeText="temperatureCustomizeText">-->
          </dx-label>
        </dx-series>
         <dx-series
          pane="pfirePcomp"
          valueField="avgT"
          name="Average Temperature, °C">
          <dx-label
            :visible="true" >
            <!--:customizeText="temperatureCustomizeText">-->
          </dx-label>
        </dx-series>
        <dx-series
          type="bar"
          valueField="prec"
          name="prec, mm">
          <dx-label
            :visible="true" >
            <!--:customizeText="precipitationCustomizeText">-->
          </dx-label>
        </dx-series>
        <dx-common-series-settings
          argumentField="month"
          >
        </dx-common-series-settings>
        <dx-pane name="topPane"
                 border.visible=true
                 border.color="#d3d3d3"
                 border.bottom=true
                 border.width=5

        >
        </dx-pane>
        <dx-pane name="firingPressure"></dx-pane>
        <dx-pane name="pfirePcomp"></dx-pane>
        <dx-pane name="middlePane"></dx-pane>
        <dx-pane name="bottomPane"></dx-pane>
        <dx-value-axis pane="bottomPane">
          <dx-grid :visible="true"></dx-grid>
          <dx-title
            horizontalAlignment="center"
            text="Precipitation, mm"></dx-title>
        </dx-value-axis>
        <dx-value-axis pane="topPane">
          <dx-grid :visible="true"></dx-grid>
          <dx-title
            horizontalAlignment="center"
            text="Temperature, °C">
          </dx-title>
        </dx-value-axis>
        <dx-legend
          verticalAlignment="bottom"
          horizontalAlignment="center">
        </dx-legend>
      </dx-chart>
    </v-responsive>
</template>

<script>
    import DxChart, {
      DxCommonSeriesSettings,
      DxLegend,
      DxPane,
      // DxRangearea,
      DxValueAxis,
      DxSeries,
      DxTooltip,
      DxBorder,
      DxFormat,
      DxTitle,
      DxGrid,
      DxLabel,
      DxConnector,
      DxExport
    } from 'devextreme-vue/chart'

    import {weatherData} from "./dataOverviewPaneDiagrams";

    export default {
      name: "OverviewPaneDiagrams",
      components: {
        DxChart,
        DxCommonSeriesSettings,
        DxValueAxis,
        // DxRangearea,
        DxBorder,
        DxTitle,
        DxGrid,
        DxPane,
        DxLegend,
        DxSeries,
        DxTooltip,
        DxFormat,
        DxLabel,
        DxConnector,
        DxExport
      },
      computed: {
        weatherData() {
          return weatherData;
        }
      }
    }
</script>

<style scoped>
  #chart {
    height: 930px;
  }
</style>
