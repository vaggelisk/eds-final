<template>
    <v-card style="background-color: rgb(42,42,42);">
        <v-card-title v-if="faultData.color===20" style="color: rgb(205, 57, 64);height:20%;" primary class="title">ALERT</v-card-title>
        <v-card-title v-if="faultData.color===10" style="color: rgb(205, 57, 64);height:20%;" primary class="title">WARNING</v-card-title>                  
        <v-card-title >{{faultData.Description}}</v-card-title>
        <v-card-actions>
        <v-layout row>
            <v-flex d-flex md6>
                <Card v-if="Panel1Card"
                    v-bind:cardData="Panel1Data"/>
                <BarChart v-else
                    v-bind:dataChart="Panel1Data"/>
            </v-flex>
            <v-flex d-flex md6>
                <Card v-if="Panel2Card"
                    v-bind:cardData="Panel2Data"/>
                <BarChart v-else
                    v-bind:dataChart="Panel2Data"/>
            </v-flex>
        </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>

import Card from    "./Card";
import BarChart from "../enginePerformance/detailedView/BarChart"

  export default {
    name: "FaultDetails",
    components:{Card, BarChart},
    props: {
      faultData : Object, 
      aggrData : Object,
      engMap : Object
    },
    data: function() {
      return {
          Panel1Title: "Title 1",
          Panel2Title: "Title 2",
          Panel1Card : false,
          Panel2Card : true,
          Panel1Data : {},
          Panel2Data: {},
          faultDate : new Date(faultData["Date"]),
          minus30Date : new Date(faultDate.getTime() - 30 *60000)
      }
    },
    watch: {
        faultData: function()
        {
            if (this.faultData.tag == "Comp") this.setPanel();
            else if (this.faultData.tag ==  "R") this.setRPanel();
            else this.setEHCPanel();
        }
    },
    methods: {
        setPanel: function()
        {
            console.log("set comp panel");

            var template = this.faultData.Template;

            var list1 = this.faultData.Panel1;

            if (template == 7)
            {
                this.Panel1Title = "Failure trending";

                //addTrendingChart(list1, 0);
            }
            else if (template < 4)
            {
                this.Panel1Title = list1[0];
                
                this.addCard(list1, 'Panel1Card', 'Panel1Data');
            }
            else
            {                
                var tmp = list1[0];
                var title1 = "";

                if (!(tmp[0] in this.engMap["EDS_Mapping"])) title1 = tmp[0];
                else if (!('elementIndex' in this.engMap["EDS_Mapping"][tmp[0]])) title1 = this.engMap["EDS_Mapping"][tmp[0]]['shortName'];
                else  title1 = this.engMap["EDS_Mapping"][tmp[0]]['combinedName'];

                if (template < 6) this.addBarChart(list1, 'Panel1Card', 'Panel1Data', title1);
                //else addLineChart(list1, 0);                
            }

            //title1.Text = title1.Text.Replace("Engine 0", "");

            var list2 = this.faultData.Panel2;


            if (list2.Length == 0)
            {
                this.Panel2Title = "";
            }
            else if (template == 2)
            {
                this.Panel2Title = list2[0];
                this.addCard(list2, 'Panel2Card', 'Panel2Data');
            }
            else 
            {
                var tmp = list2[0];
                var title2 = "";

                if (!(tmp[0] in this.engMap["EDS_Mapping"])) title2 = tmp[0];
                else if (!('elementIndex' in this.engMap["EDS_Mapping"][tmp[0]])) title2 = this.engMap["EDS_Mapping"][tmp[0]]['shortName'];
                else  title2 = this.engMap["EDS_Mapping"][tmp[0]]['combinedName'];

                if ((template == 1) || (template == 4)) this.addBarChart(list2, 'Panel2Card', 'Panel2Data', title2);
                //         else addLineChart(list2, 1);
            }
            
            //     title2.Text = title2.Text.Replace("Engine 0", "");       

        },
        addCard: function(list, cardBool, cardData)
        {
            this[cardData] = {};
            this[cardData].Title = list[0];
            this[cardData].Unit="";
            this[cardData].Format=1;

            this[cardData].Value=list[1];
            this[cardData].Ref=list[2];

            if (list[3]==20) this[cardData].Color = "red";
            else this[cardData].Color = "green";

            this[cardBool] = true;
        },
        addBarChart: function(list,cardBool, chartData, title)
        {
            this[chartData]={};
            this[chartData].arrangements ={};
            this[chartData].arrangements.name =title;
            

            if (list[2] == 0) this[chartData].arrangements.yaxis = "Values";
            else if (list[2] == 1) this[chartData].arrangements.yaxis = "Diff.";
            else this[chartData].arrangements.yaxis = "% Diff.";
            
            this[chartData].values = [];

            let param = list[0][0];

            let exp = 0, val;
            let limit = list[4];
            
            this.faultDate = new Date(this.faultData["Date"]);
            
            this.minus30Date = new Date(this.faultDate.getTime() - 30 *60000);

            for (var item in this.aggrData.data[param])
            { 
                let dt = new Date(item);

                if ((dt<=this.faultDate)&&(dt>=this.minus30Date))
                {
                    exp = 0;
                    val = this.aggrData.data[param][item];

                    let type = list[3];

                    if (type == 2)
                    {
                        let hcParam = this.engMap["EHC_Mapping"][param]["parameterTag"];

                        var ehcExp = this.aggrData.ehcTl.filter(function(ehcItem){
                            return ehcItem.Time == item;
                        });

                        exp = ehcExp[0]['Exp'][hcParam][0];
                    }
                    else if (type == 1)
                    {
                        let isoParam = param + "_ISO";

                         var shopExp = this.aggrData.ehcTl.filter(function(shopItem){
                            return shopItem.Time == item;
                        });

                        exp = shopExp[0]['shopTime'][isoParam];
                    }
                    else if (type == 6) exp = list[4];
                    else if (type == 0)
                    {
                        if (param == "soPresDispl") exp =  this.aggrData.data["soPresSetpoint"][item];
                        else if (param.Contains("fRailPres")) exp =  this.aggrData.data["fRailPresSet"][item];
                    }
                    else if (type == 5)
                        exp = this.aggrData.data["PistonUndersidereference"][item];

                    if ((exp != 0) && (exp != -1000) && (val != -1000))
                    {
                        let barValue=0, tag = 0;

                        if (type == 0) barValue = val;
                        else if (type == 1) barValue = val - exp;
                        else barValue = ((val - exp) / val) * 100;

                        if (limit > 0)
                        {
                            if (barValue > limit) tag =1;
                        }
                        else
                        {
                            if (barValue < limit) tag =1;
                        }

                        this[chartData].values.push({
                            'arg': dt,
                            'value': barValue,
                            'tag': tag });
                    }
                }
            }

            this[cardBool] = false;
        },
        setRPanel: function()
        {},
        setEHCPanel: function()
        {}
    },
    mounted() {
        if (this.faultData.tag == "Comp") this.setPanel();
        else if (this.faultData.tag ==  "R") this.setRPanel();
        else this.setEHCPanel();

    }
  }
</script>

<style scoped>