<template>
  <v-responsive>
    <v-card-title primary class="title">
      Energy Balance (Reference) [KWh]
    </v-card-title>
    <!--{{ powerByPart }}-->
    <!--{{ EDS_Mapping }}-->

    <dx-pie-chart dark
      id="pie"
      :data-source="powerByPart"
      type="doughnut"
      palette="Soft Pastel"
    >    
      <dx-animation :enabled="false"/>
      <dx-series argument-field="part">
        <dx-label
          :visible="true"
          :customizeText="customizeLabel"
        >
          <!-- afto to format tha fygei sta kanonika data gt den tha einai M (millions) -->

          <dx-connector :visible="false"/>
        </dx-label>
      </dx-series>
      <dx-legend
        :margin="0"
        horizontal-alignment="center"
        vertical-alignment="bottom"
      />

      <!--<dx-tooltip-->
        <!--:enabled="true"-->
        <!--:customize-tooltip="customizeTooltip"-->
      <!--&gt;-->
        <!--<dx-format-->
          <!--type="millions"-->
        <!--/>-->
      <!--</dx-tooltip>-->

    </dx-pie-chart>


  </v-responsive>
</template>

<script>
  import DxPieChart, {
    DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    DxLabel,
    DxConnector,
    DxExport,
    DxAnimation
  } from 'devextreme-vue/pie-chart';

  import { populationByRegions } from './dataEnergyBalanceReference';
  import { EDS_Parameter_Names }           from '../../../api/dataEdsParameterNames'

  export default {
    name: "EnergyBalanceReference",
    components: {
      DxPieChart,
      DxLegend,
      DxSeries,
      DxTooltip,
      DxFormat,
      DxLabel,
      DxConnector,
      DxExport,
      DxAnimation
    },
    props: {
      pieData: Object,
    },
    data() {
      return {
        // customizeTooltip(arg) {
        //   return {
        //     text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`
        //   };
        // },
        customizeLabel(arg) {
          return `${arg.valueText}  (${(arg.percent * 100).toFixed(2)}%)`;
        }
      };
    },
    computed: {
      populationByRegions() {
        return populationByRegions;
      },
      powerByPart() {
        let pbp= [];
        for (let k in this.pieData){
          pbp.push( { part: EDS_Parameter_Names[k].longName, val: this.pieData[k].toFixed(0), name: EDS_Parameter_Names[k].longName } );
        }
        return pbp;
      }
    }
  }
</script>

<style scoped>
  #pie {
    height: 440px;
  }

</style>
