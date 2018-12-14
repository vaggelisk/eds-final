<template>
  <v-responsive>
    <dx-chart
      id="chart"
      :data-source="populationData"
      title="World Population by Decade"
    >
      <dx-argument-axis :tick-interval="10">
        <dx-label format="decimal"/>
      </dx-argument-axis>
      <dx-series type="bar"/>
      <dx-legend :visible="false"/>
    </dx-chart>
  </v-responsive>
</template>

<script>

  import DxButton from 'devextreme-vue/button';
  import DxChart, {
    DxArgumentAxis,
    DxLegend,
    DxLabel,
    DxSeries
  } from 'devextreme-vue/chart';
  import { populationData } from './dataNotification.js';

  export default {
    name: "Notification",
    props: {
      childNotificationDataLoaded: Boolean,
      notificationData: Object,
    },
    components: { DxButton, DxChart,
      DxArgumentAxis,
      DxLabel,
      DxLegend,
      DxSeries },
    data: function () {
      return {
        loading: false,
      }
    },
    computed: {
      populationData() {
        return populationData;
      }
    },
    mounted() {
      this.loading = false;
    }
  }


</script>

<style scoped></style>

