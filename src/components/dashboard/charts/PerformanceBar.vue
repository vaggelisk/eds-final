<template>
  <div>
    <canvas style="margin-top: 10px !important" id="performance-dashboard-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

// const myChart2={};

export default {
  name: "PerformanceBar",
  props: {
    childPerformanceParamDataLoaded: Boolean,
    performanceParamData: Object,
    counter: Number
  },
  data: function() {
    return {
      loading: true,
      performanceDataC: this.performanceParamData,
      barChartData: {
        type: "bar",
        data: {
          labels: this.performanceParamData.datapoints.labels,
          datasets: [
            {
              label: "%",
              // label: this.performanceDataC.datapoints.labels,
              backgroundColor: "green",
              data: this.performanceParamData.datapoints.val
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          }
        }
      }
    };
  },
  methods: {
    updateDataChart(v) {
      this.myChart2.data.datasets.forEach((ds) => {
         ds.data = v;
      });
      this.myChart2.update();
    },

    createChart2(chartId, data) {
      const ctx = document.getElementById(chartId);
      this.myChart2 = new Chart(ctx, data);

    }
  },
  mounted() {
    this.loading = false;
    this.createChart2("performance-dashboard-chart", this.barChartData);
    this.$watch('performanceParamData.datapoints.val', function (newVal, ) {
        this.updateDataChart(newVal);
    })
  }
};
</script>

<style scoped></style>
