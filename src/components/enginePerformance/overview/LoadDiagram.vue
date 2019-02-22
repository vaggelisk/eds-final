<template>
    <v-responsive>
      <v-card-title primary class="title"> Load Diagram </v-card-title>
      <!--{{ dataSource2 }}-->
      <v-flex  d-flex  >
        <p><em>Shaft Power [kW]</em> </p>
        <dx-chart
          id="chart1"
          :data-source="dataSource2"
          palette="Green"
        >        
          <dx-animation :enabled="false"/>
          <dx-common-series-settings
            :type="type"
            argument-field="x"
          />
          <dx-series
            v-for="energy in energySources"
            :key="energy.value"
            :value-field="energy.value"
            :name="energy.name"  >
            <DxPoint  v-if="energy.value==='engineLimit'"  :visible="false" ></DxPoint>
            <DxPoint  v-if="energy.value==='shopTests'"    :visible="false" ></DxPoint>
            <DxPoint  v-if="energy.value==='seaTrials'"    :visible="false" ></DxPoint>
            <DxPoint  v-if="energy.value==='measured'"
                      size=16  symbol="triangleUp" :visible="true" >
            </DxPoint>
          </dx-series>
          <dx-margin :bottom="20"/>
          <dx-argument-axis
            :value-margins-enabled="false"
            discrete-axis-division-mode="crossLabels"
          >
            <dx-grid :visible="false" :opacity="0.3"   />
          </dx-argument-axis>
          <dx-value-axis>
            <dx-grid :visible="true"
                     :opacity="0.3" />
          </dx-value-axis>
          <dx-legend
            columnCount=1
            vertical-alignment="left"
            horizontal-alignment="right"
            item-text-position="left"
          />
          <dx-crosshair
            :horizontal-line="false"
            :enabled="true"
            color="#949494"
            :width="1"
            dashStyle="solid">
          </dx-crosshair>
          <dx-tooltip
            :shared="true"
            :enabled="true"
            :customize-tooltip="customizeTooltip"
          />
        </dx-chart>

      </v-flex>
      <div      style="margin-top: -25px; margin-right: 20px; text-align: right">
        <em>Rotational Speed [RPM] </em>
      </div>

    </v-responsive>
</template>

<script>
  import service from '../detailedView/dataLineChart'
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
    DxTooltip,
    DxConstantLine,
    DxAnimation
  } from 'devextreme-vue/chart';

  export default {
    name: "LoadDiagram",
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
      DxTooltip,
      DxConstantLine,
      DxAnimation
    },
    props: {
      loadDiagramData: Object,
    },
    data() {
      return {
        dataSource: service.getSources(),
        // energySources: service.getSourcesInfo(),
        energySources: service.getSourcesInfoLoadDiagram(),
        type: 'spline'
      };
    },
    computed: {
      dataSource2() {
        let d = [];
        let len = this.loadDiagramData.engineLimit.length;
        for (let i=0; i<len; i++) {
          d.push({
            x: this.loadDiagramData.engineLimit[i][0],
            engineLimit: this.loadDiagramData.engineLimit[i][1],
          });
        }
        len =  this.loadDiagramData.seaTrials.length  ;
        for (let i=0; i<len; i++) {
          if (d.find( o => o.x === this.loadDiagramData.seaTrials[i][0]) === undefined) {
            d.push({
             x:  this.loadDiagramData.seaTrials[i][0],
             seaTrials: this.loadDiagramData.seaTrials[i][1]
            })
          } else {
            let j = d.findIndex( o => o.x === this.loadDiagramData.seaTrials[i][0]);
            d[j].seaTrials = this.loadDiagramData.seaTrials[i][1];
          }
        }

        len =  this.loadDiagramData.shopTests.length;
        for (let i=0; i<len; i++) {
          if (d.find( o => o.x === this.loadDiagramData.shopTests[i][0]) === undefined) {
            d.push({
              x:  this.loadDiagramData.shopTests[i][0],
              shopTests: this.loadDiagramData.shopTests[i][1],
            })
          } else {
            let j = d.findIndex( o => o.x === this.loadDiagramData.shopTests[i][0]);
            d[j].shopTests = this.loadDiagramData.shopTests[i][1];
          }
        }

        len =  this.loadDiagramData.calculated.length  ;
        for (let i=0; i<len; i++) {
          if (d.find( o => o.x === this.loadDiagramData.calculated[i][0]) === undefined) {
            d.push({
              x:  this.loadDiagramData.calculated[i][0],
              calculated: this.loadDiagramData.calculated[i][1],
            })
          } else {
            let j = d.findIndex( o => o.x === this.loadDiagramData.calculated[i][0]);
            d[j].calculated = this.loadDiagramData.calculated[i][1];
          }
        }

        len =  this.loadDiagramData.measured.length  ;
        for (let i=0; i<len; i++) {
          if (d.find( o => o.x === this.loadDiagramData.measured[i][0]) === undefined) {
            d.push({
              x:  this.loadDiagramData.measured[i][0],
              measured: this.loadDiagramData.measured[i][1]
            })
          } else {
            let j = d.findIndex( o => o.x === this.loadDiagramData.measured[i][0]);
            d[j].measured = this.loadDiagramData.measured[i][1];
          }
        }

        return d;

      }
    },
    methods: {
      customizeTooltip: (points) => {
        let l = points.points.length;
        let t = "";
        for (let k=0; k<l; k++){
          t = t + points.points[k].seriesName + ": " + points.points[k].value.toFixed(0)+ "<br>"
        }
        return {
          html: '<span>Rotational Speed: ' + points.originalArgument + '<br>' + t +' </span>',
        };
      }
    }

  }
</script>

<style scoped>

  #chart1 {
    height: 450px;
    width:  500px;
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
