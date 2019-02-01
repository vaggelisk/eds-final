<template>
    <v-card style="width : 100%; background-color: rgb(42,42,42); height:250px;">
        <v-card-title style="height:20%;" primary class="title">{{ cardData.Title }} </v-card-title>

        <v-card-title v-show="isShowing" style="height:40%;">
            <div v-if="cardData.Color==='red'" :style="'border-left:5px solid rgb(205, 57, 64) ;height:50px; margin-right:10px;' "></div>            
            <div v-if="cardData.Color==='green'" :style="'border-left:5px solid rgb(60, 171, 48);height:50px; margin-right:10px;' "></div>            
            <div v-if="cardData.Color==='gray'" :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px;' "></div>
            <div>
                <div class="headline">                    
                    <h2 v-if="cardData.Value===-1000">-</h2>
                    <h2 v-else-if="cardData.Color==='red'" style="color: rgb(205, 57, 64);">{{ cardData.Value.toFixed(cardData.Format)}} </h2>
                    <h2 v-else>{{ cardData.Value.toFixed(cardData.Format)}} </h2>
                </div>
                <span class="grey--text">Measured [{{ cardData.Unit}}] </span>
            </div>
        </v-card-title>

        <v-card-actions fill-height :style="'width : 100%; height:'+height+';'">            
            <v-container fluid grid-list-xs style="width:100%; height:100%; margin: 5px; padding:10px;"  >
            <!-- <v-container fluid style="margin-left: -21px; padding-right:0px;"  > -->
                <v-layout row wrap  style="width:100%; height:100%;" >
                    <v-flex v-show="isShowing" xs4>
                        <div class="headline" >{{cardData.Ref.toFixed(cardData.Format)}}</div>
                        <span class="grey--text"> Reference  </span>
                    </v-flex>

                    <v-flex :xs8 ="isShowing" :xs12="!isShowing"  style="height:100%;"
                            @click="updateChart()">
                        <dx-chart id="chart"
                                :dataSource="cardData.datapoints"
                                :series="series" style="width: 100%; height: 100%">
                            <dx-animation :enabled="false"/>
                            <dx-legend :visible="false"/>
                            <dx-value-axis>
                                <dx-grid color="rgb(67,67,67)"/>
                            </dx-value-axis>
                            <dx-argument-axis> 
                                <dx-tick-interval miliseconds="60000"/> 
                                <!-- <dx-visual-range :start-value="minValue" :end-value="maxValue"/>     -->
                            </dx-argument-axis>
                            <dx-series
                                    color="rgb(92, 92, 92)"
                                    type="rangeArea"
                                    argument-field="date"
                                    range-value1-field="valMin"
                                    range-value2-field="valMax"
                                    name="Range">
                                    <dx-border color="rgb(26,26,26)"
                                                :visible="true"
                                                :width="1"/>
                            </dx-series>
                            <dx-series
                                    color="white"
                                    type="line"
                                    argument-field="date"
                                    value-field="val"
                                    name="Values">
                                <dx-point :size="0"/>
                            </dx-series>
                        </dx-chart>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DxChart, {
        DxArgumentAxis,
        DxSeries,
        DxPoint,
        DxValueAxis,
        DxAnimation,
        DxLegend,
        DxCommonAxisSettings, 
        DxGrid,
        DxBorder,
        DxVisualRange,
        DxTickInterval,
        DxWholeRange
    } from 'devextreme-vue/chart';

    export default {
        name: "Card",
        components: {
            DxChart,
            DxArgumentAxis,
            DxSeries,
            DxPoint,
            DxValueAxis,
            DxAnimation,
            DxLegend,
            DxCommonAxisSettings, 
            DxGrid,
            DxBorder,
            DxVisualRange,
            DxTickInterval,
            DxWholeRange
        },
        props: {
            dataLoaded: Boolean,
            cardData: Object,
            counter: Number,
        },
        data: function () {
            return {
                height:'40%',
                isShowing: true,
                loading: true,
                minValue: new Date(2018,5,1,10,0,0,0),
                maxValue: new Date(2018,5,1,10,0,0,0)
            }
        },
        methods: {
            updateChart() {
                this.isShowing = !this.isShowing;
                if (this.isShowing) this.height='40%';
                else this.height='80%';
                //document.getElementById(this._self._uid).DxChart.render();
            }
        },
        mounted() {
            this.loading = false;
            this.isShowing = true;
            document.getElementById('chart').setAttribute('id',this._self._uid);          

        }, 
        watch:
        {
            counter : function(c)
            {
                var orderedByDate = this.cardData.datapoints.sort(function (a, b) {
                    return  a.date > b.date ? 1 : 0;
                })

                // if (this.cardData.datapoints.length<30)
                // {
                //     this.minValue = orderedByDate.pop().date;
                //     this.maxValue = new Date(this.minValue.getTime() + 30*60000);                 

                // }
                // else
                // {
                    this.maxValue = orderedByDate[0].date;
                    this.minValue = new Date(this.maxValue.getTime() - 30*60000);
                //}
            }
        }
    }
</script>

<style scoped>
</style>


