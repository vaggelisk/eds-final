<script>

  import { Line, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins;

  export default {
    name: "LineChart",
    extends: Line,
    mixins: [reactiveProp],
    props: { data: Object, opts: Object },
    mounted() {

      console.log(this.opts);
      console.log(this.data);
      this.renderChart( this.chartData, this.opts );
    },

    computed: {
      chartData: function() {
        return  this.data ;
      }
    },
    methods: {
      renderLineChart: function() {
        this.renderChart({
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
            ],
            datasets: [
              {
                label: "Data One",
                backgroundColor: "#f87979",
                data: [2, 2, 2, 2]
              }
            ]
          },
          // options: { responsive: true, maintainAspectRatio: false},
          }
        );
      }
    },
    // watch: {
    //   data: function() {
    //     this._chart.destroy();
    //     console.log(this.data);
    //     // console.log(this.options);
    //     //this.renderChart(this.data, this.options);
    //     this.renderLineChart();
    //   }
    // }
  }

</script>

<style scoped></style>



