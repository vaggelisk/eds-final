<template>
  <v-responsive contain>


    <v-card-title primary class="title" style="margin-top: -20px">
      <v-select v-model="select" :items="items" flat></v-select>
    </v-card-title>
    <!--{{dataChart.sources}} <br>-->
    <!--{{dataChart.sourcesInfo}} <br>-->

    <v-flex  v-if="select === 'Pressure Trace'" d-flex>
      <p><em>Pressure [bar] </em> </p>

      <!--<dx-chart-->
      <!--id="chart"-->
      <!--:data-source="dataSources"-->
      <!--&gt;-->
      <dx-chart
        id="chart"
        :data-source="dataChart.sources" >
        <dx-common-series-settings
          :type="type"
          argument-field="crankAngle"
        />
        <!--<dx-series-->
          <!--v-for="item in dataChart.sourcesInfo"-->
          <!--v-bind:key="item.value"-->
          <!--v-bind:value-field="i.value"-->
          <!--v-bind:name="i.name"-->
        <!--&gt;-->

          <dx-series
            argument-field="crankAngle"
            :value-field="dataChart.sourcesInfo[0].value"
            :name="dataChart.sourcesInfo[0].name" >
            <DxPoint :visible="false" />
          </dx-series>



        <dx-margin :bottom="20"/>
        <dx-argument-axis
          :value-margins-enabled="false"
          discrete-axis-division-mode="crossLabels"
        >
        </dx-argument-axis>
        <dx-value-axis
        >
          <dx-grid :visible="true"
                   :opacity="0.3" />
        </dx-value-axis>
        <dx-crosshair
          :horizontal-line="false"
          :enabled="true"
          color="#949494"
          :width="1"
          dashStyle="solid">

        </dx-crosshair>


        <dx-legend
          vertical-alignment="top"
          horizontal-alignment="center"
          item-text-position="bottom"
        />

        <!--<dx-tooltip-->
        <!--:enabled="true"-->
        <!--:customize-tooltip="customizeTooltip"-->
        <!--/>-->
      </dx-chart>



    </v-flex>


    <v-card-title v-if="select === 'Pressure Trace (firing order)'" primary-title>
      <v-divider class="mx-3" vertical></v-divider>
      <div>
        <div class="headline">
          <h2>dio</h2>
        </div>
      </div>
    </v-card-title>

    <v-card-actions v-if="select === 'Pressure Trace (firing order)'">
      <v-container>
        <v-layout row wrap>
          fghfhlkg
        </v-layout>
      </v-container>
    </v-card-actions>

    <v-card-title
      v-if="select === 'Pressure vs Volume'"
      primary-title
    >
      <v-divider class="mx-3" vertical></v-divider>
      <div>
        <div class="headline">
          <h2> tria </h2>
        </div>
        <span class="grey--text">Measured [kW ] </span>
      </div>
    </v-card-title>

    <v-card-actions v-if="select === 'Pressure vs Volume'">
      <v-container>
        <v-layout row wrap>
          3
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-responsive>
</template>

<script>
  import {
    DxChart,
    DxSeries,
    DxPoint,
    DxArgumentAxis,
    DxValueAxis,
    DxCrosshair,
    DxCommonSeriesSettings,
    DxGrid,
    DxMargin,
    DxLegend,
    DxTitle,
    DxSubtitle,
    DxTooltip
  } from 'devextreme-vue/chart';

  import service from './dataLineChart';


  ///////////////   http://localhost:8092/HyperCubeData/{{counter}}

  export default {
    name: "LineChart",
    components: {
      DxChart,
      DxPoint,
      DxSeries,
      DxArgumentAxis,
      DxValueAxis,
      DxCrosshair,
      DxCommonSeriesSettings,
      DxGrid,
      DxMargin,
      DxLegend,
      DxTitle,
      DxSubtitle,
      DxTooltip
    },
    props: {
      dataChart: Object,
      counter: Number,
    },
    data: function () {
      return {
        select: "Pressure Trace",
        items: ["Pressure Trace", "Pressure Trace (firing order)", "Pressure vs Volume"],
        // dataSources: service.getSources(),
        // dataSourcesInfo: service.getSourcesInfo(),
        type: 'spline'
      }
    },
    methods: {
      // customizeTooltip: (arg) => {
      //   return {
      //     text: arg.valueText
      //   };
      // }
    },
    // beforeCreate() {
    //   return {
        // dataSourcesInfo : this.dataChart.sourcesInfo,
      // }
    // }
  }
</script>

<style scoped>

  #chart {
    height: 420px;
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


<!--<dx-chart-->
<!--id="chart"-->
<!--:data-source="dataChart.sources" >-->
<!--<dx-series-->
<!--argument-field="crankAngle"-->
<!--value-field="cyl1">-->
