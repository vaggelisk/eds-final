<template>
  <v-container fluid grid-list-md>
    <v-layout row >
      <v-flex d-flex md4>
        <v-layout column >
          <v-flex d-flex md6>

            <v-responsive contain>
              <v-card style="background-color: rgb(42,42,42);width:100%;height:100%;">

                  <LoadDiagram style="width:100%;height:100%;"
                    v-if="overviewCardsData.loadDiagram"
                      v-bind:loadDiagramData="overviewCardsData.loadDiagram" />

              </v-card>
            </v-responsive>

          </v-flex>
          <v-flex d-flex md6>
            <v-responsive contain>

              <v-card style="background-color: rgb(42,42,42);width:100%;height:100%;">
                <EnergyBalanceReference style="width:100%;height:100%;"
                  v-if="overviewCardsData.energyBalance"
                  v-bind:pieData="overviewCardsData.energyBalance" />
              </v-card>

            </v-responsive>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md2>
        <v-layout column >
          <v-flex d-flex  v-for="name in firstCol" :key="name" md3>
            <v-responsive contain>
                  <Card  v-if="overviewCardsData[name]"
                      v-bind:cardData="overviewCardsData[name]"
                      v-bind:counter="counter" />
            </v-responsive>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md2>
        <v-layout column >
          <v-flex d-flex  v-for="name in secCol" :key="name" md3>
            <v-responsive contain>
                  <Card  v-if="overviewCardsData[name]"
                      v-bind:cardData="overviewCardsData[name]"
                      v-bind:counter="counter" />
            </v-responsive>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md4>
        <v-layout column>
          <v-flex v-for="name in chart" :key="name">
            <v-responsive contain>
                 <TimelineChart style="height:200px;" v-if="overviewCardsData[name]"
                    v-bind:tlData="overviewCardsData[name]"
                    v-bind:counter="counter" />
            </v-responsive>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios                    from "axios";
  import Card                     from "../Controls/Card"
  import LoadDiagram              from "./overview/LoadDiagram";
  import TimelineChart            from "../Controls/TimelineChart";
  import EnergyBalanceReference from "./overview/EnergyBalanceReference";


  export default {
    name: "Overview",
    components: {
      EnergyBalanceReference,
      LoadDiagram,
      Card,
      TimelineChart
    },
    data: function () {
        return {
          overviewCardsData: {},
          counter: 31,
          firstCol: ['pscav', 'bmep', 'indiP', 'bsfc'],
          secCol:['mechEff', 'co2Em','torque','pexh'],
          chart:['pcomp', 'pmax', 'pmaxPcomp', 'tcspeed','tTurbIn']
        }
    },
    methods: {
      startInterval: function () {
        this.interval = setInterval(() => {
          if (this.counter < 60) {
            this.getAllCardsData( this.counter );
            this.counter = this.counter + 1;
          } else {
            clearInterval(this.interval);
          }
        }, 15000)
      },
      getAllCardsData( counter ) {
        axios.get("http://localhost:8092/EDSMapping").then(resp => {

          let params = ['pscav', 'bmep', 'indiP', 'bsfc','mechEff', 'co2Em','torque','pexh','pcomp', 'pmax', 'pmaxPcomp', 'tcspeed', 'tTurbIn'];

          let objs = ['pscav', 'bmep', 'indiP', 'bsfc','mechEff', 'co2Em','torque','pexh','pcomp', 'pmax', 'pmaxPcomp', 'tcspeed', 'tTurbIn'];

          for( let i = 0; i < params.length; i++ )
          {
            this.$set(this.overviewCardsData[objs[i]], 'Title',resp.data.EDS_Parameter_Names[params[i]].longName);
            this.$set(this.overviewCardsData[objs[i]], 'Unit',resp.data.EDS_Parameter_Names[params[i]].unit);
          }

        });

      let url  = "http://localhost:8092/EDSTimelineData/" + this.counter;

      axios.get(url).then(response => {
        let len = Object.keys(response.data).length;
        // console.log(len);
        let helperMatrix = response.data[Object.keys(response.data)[len - 1]];

        let params = ['pscav','bmep', 'indiP', 'bsfc', 'co2Em','torque','pexh','Pcomp', 'Pmax', 'PressureRise', 'TCspeed', 'Tturbin'];

        let objs = ['pscav', 'bmep', 'indiP', 'bsfc', 'co2Em','torque','pexh','pcomp', 'pmax', 'pmaxPcomp', 'tcspeed', 'tTurbIn'];

        for (let i=0; i<params.length;i++)
        {
          let array = helperMatrix[params[i]];

          let average = (array) => array.reduce((a, b) => a + b) / array.length;

          let avg = average(array[0]);
          let ref = average(array[1]);

          this.$set(this.overviewCardsData[objs[i]],'Value',avg);
          this.$set(this.overviewCardsData[objs[i]],'Ref',ref);

          let min = array[2];
          let max = array[3];

          if (params[i] == 'PressureRise')
          {
            min = min * 100;
            max = max * 100;
          }

          let temp = ( (avg -  ref)/avg) * 100;

          let clr =  ((temp > min) && (temp < max))? "green" : "red";

          if ((avg==-1000)||(ref==-1000)) this.$set(this.overviewCardsData[objs[i]], 'Color', 'gray');
          else this.$set(this.overviewCardsData[objs[i]], 'Color', clr);

          let data = [];
          for (let j = 0; j < len; j++){

            let helper = response.data[Object.keys(response.data)[j]];

            array = helper[params[i]];

            avg = average(array[0]);
            ref = average(array[1]);

            min = array[2];
            max = array[3];

            if (params[i] == 'PressureRise')
            {
              min = min * 100;
              max = max * 100;
            }

            let valMin = ref/(1 - min/100);
            let valMax = ref/(1 - max/100);

            clr =  ((avg > valMin) && (avg < valMax))? "green" : "red";

            let point = {};

            point.date = new Date(Object.keys(response.data)[j]);
            point.val = avg;
            point.valMin = valMin;
            point.valMax = valMax;
            point.color = clr;

            data.push(point);
          }

          var anyMinus1000 = data.some(function (item) {
	        return  item.val == -1000;
          });

          if (anyMinus1000) this.$set(this.overviewCardsData[objs[i]],'datapoints',[]);
          else this.$set(this.overviewCardsData[objs[i]],'datapoints', data);
        }

        });

        url  = "http://localhost:8092/HyperCubeData/" + this.counter;

        axios.get(url).then(response => {

          this.$set(this.overviewCardsData, 'energyBalance', response.data.power);
          this.$set(this.overviewCardsData, 'loadDiagram',   response.data.loadSeries);


          this.$set(this.overviewCardsData.mechEff,'Value',response.data.pressureTrace["Mech Efficiency"][0]);
          this.$set(this.overviewCardsData.mechEff,'Ref',response.data.pressureTrace["Mech EfficiencyExp"][0]);

          this.$set(this.overviewCardsData.mechEff,'Color', 'gray');

          let data = [];
          this.$set(this.overviewCardsData.mechEff,'datapoints', data);
        });
      },
    },
    mounted() {
      this.getAllCardsData();
      this.startInterval();

      for (let i=0; i<this.firstCol.length;i++)
        this.$set( this.overviewCardsData, this.firstCol[i], {});


      for (let i=0; i<this.secCol.length;i++)
         this.$set( this.overviewCardsData, this.secCol[i], {});


      for (let i=0; i<this.chart.length;i++)
         this.$set( this.overviewCardsData, this.chart[i], {});

    },



  }
</script>

<style scoped>

</style>
