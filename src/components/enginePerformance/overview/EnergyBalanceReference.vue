<template>
  <v-responsive>
    <v-card-title primary class="title">
      Energy Balance (Reference) [KWh]
    </v-card-title>
    <dx-pie-chart dark
      id="pie"
      :data-source="populationByRegions"
      type="doughnut"
      palette="Soft Pastel"
    >
      <dx-series argument-field="region">
        <dx-label
          :visible="true"
          :customizeText="customizeLabel"
          format="millions">
          <!-- afto to format tha fygei sta kanonika data gt den tha einai M (millions) -->

          <dx-connector :visible="false"/>
        </dx-label>
      </dx-series>
      <!--<dx-export :enabled="true"/>-->
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
    DxExport
  } from 'devextreme-vue/pie-chart';

  import { populationByRegions } from './dataEnergyBalanceReference';

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
      DxExport
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
      }
    }
  }
</script>

<style scoped>
  #pie {
    height: 440px;
  }

</style>
