<template>
    <v-card flat style="width : 100%; background-color: rgb(42,42,42); height:100%;">
        <v-select v-model="select" :items="items" item-text="Title" item-value="index" flat  primary class="title" style="height:20%; padding:16px; margin:0px; ">
        </v-select> 
        <v-card-actions style="height:80%;">
            <v-layout column style="height:100%;">
                <v-flex d-flex v-for="(param,index) in parameters" :key="param">                      
                    <TimelineChart v-if="index===parameters.length-1" 
                        v-bind:tlData="data[param]"                           
                        v-bind:xAxis="true" /> 
                    <TimelineChart v-else
                        v-bind:tlData="data[param]"       
                        v-bind:xAxis="false" />
                </v-flex> 
            </v-layout>          

        </v-card-actions>
    </v-card>
</template>

<script>
import TimelineChart from './TimelineChart'
import {globalStore}    from "../../main.js"

export default {
  name: "DropDownChart",
  components: { TimelineChart },
  props: {
      items:Array,
      parameters: Array
  },
  data: function() {
    return {
      select: "",
      data:{}
      //chart: this.items[0].Data
    //  val: this.items[0].Data.Value
    };
  },
  watch:
  {
    select : function(newSelect)
    {
        console.log("CylIndex "+ newSelect);

        this.setData();
        //this.chart = newSelect.Data;
    }
  },
  methods: 
  {
      setData: function() 
      {
        let objs = ['CAngleEVO', 'CAngleEVC', 'valveLift'];

        let formats =  [1,1,1];

        for( let i = 0; i < objs.length; i++ )
        {
          this.$set(this.data[objs[i]], 'Title',globalStore.engMap.EDS_Parameter_Names[objs[i]].longName);
          this.$set(this.data[objs[i]], 'Unit',globalStore.engMap.EDS_Parameter_Names[objs[i]].unit);
          this.$set(this.data[objs[i]], 'Format',formats[i]);
        }

        let len = Object.keys(globalStore.timelineData).length;
        let helperMatrix = globalStore.timelineData[Object.keys(globalStore.timelineData)[len - 1]];

        let params = [ 'EVOpercyl', 'EVCpercyl', 'Stroke'];

        for (let i=0; i<params.length;i++)
        {

          let data = [];
          for (let j = 0; j < len; j++){

            let helper = globalStore.timelineData[Object.keys(globalStore.timelineData)[j]];

            let array = helper[params[i]];

            let avg = array[0][this.select];
            let ref = array[1][this.select];

            let min = array[2];
            let max = array[3];

            let valMin = ref/(1 - min/100);
            let valMax = ref/(1 - max/100);

            let clr =  ((avg > valMin) && (avg < valMax))? "green" : "red";

            let point = {};

            point.date = new Date(Object.keys(globalStore.timelineData)[j]);
            point.val = avg;
            point.valMin = valMin;
            point.valMax = valMax;
            point.color = clr;

            data.push(point);
          }

          var anyMinus1000 = data.some(function (item) {
          return  item.val == -1000;
          });

          if (anyMinus1000) this.$set(this.data[objs[i]],'datapoints',[]);
          else this.$set(this.data[objs[i]],'datapoints', data);
        }

        

      }
  },
  mounted() {

    for(let i = 0; i < this.parameters.length; i++ )
    {
        this.$set(this.data,  this.parameters[i], {});
    }

    this.setData();
        
  }
};
</script>

<style scoped>
</style>
