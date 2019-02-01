<template>
  <v-responsive contain>


    <v-card-title primary class="title" style="margin-top: -20px">
      <v-select v-model="select" :items="itemsOfSelect" flat></v-select>
    </v-card-title>

    <v-card-actions v-if="select === 'Pressure Trace'">

        <v-flex d-flex style="margin-top: -25px">
          <p><em>Pressure [bar] </em></p>


            <v-dialog
              v-model="dialog"
              width="780">

              <span  slot="activator">

                <dx-chart
                  :id="chartId[0]"
                  :data-source="dataChart.sources" >
                  <dx-common-series-settings
                    :type="type"
                    argument-field="x"
                  />
                  <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 1'"
                    argument-field="x"
                    :value-field="dataChart.sourcesInfo[0].value"
                    :name="dataChart.sourcesInfo[0].name" >
                    <DxPoint :visible="false" />
                  </dx-series>
                  <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 2'"
                    argument-field="x"
                    :value-field="dataChart.sourcesInfo[1].value"
                    :name="dataChart.sourcesInfo[1].name" >
                    <DxPoint :visible="false" />
                  </dx-series>
                  <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 3'"
                    argument-field="x"
                    :value-field="dataChart.sourcesInfo[2].value"
                    :name="dataChart.sourcesInfo[2].name" >
                    <DxPoint :visible="false" />
                  </dx-series>
                  <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 4'"
                    argument-field="x"
                    :value-field="dataChart.sourcesInfo[3].value"
                    :name="dataChart.sourcesInfo[3].name" >
                    <DxPoint :visible="false" />
                  </dx-series>
                  <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 5'"
                    argument-field="x"
                    :value-field="dataChart.sourcesInfo[4].value"
                    :name="dataChart.sourcesInfo[4].name" >
                    <DxPoint :visible="false" />
                  </dx-series>
                  <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 6'"
                    argument-field="x"
                    :value-field="dataChart.sourcesInfo[5].value"
                    :name="dataChart.sourcesInfo[5].name" >
                    <DxPoint :visible="false" />
                  </dx-series>
                  <dx-series
                    argument-field="x"
                    :value-field="dataChart.sourcesInfo[6].value"
                    :name="dataChart.sourcesInfo[6].name" >
                    <DxPoint :visible="false" />
                  </dx-series>


                  <dx-margin :bottom="20"/>
                  <dx-argument-axis
                    :value-margins-enabled="false"
                    discrete-axis-division-mode="crossLabels">
                    <dx-constant-line
                      value=0
                      color="white"
                      :width=0.3 />
                  </dx-argument-axis>
                  <dx-value-axis
                  >
                    <dx-grid :visible="true"
                             :opacity="0.3" />
                  </dx-value-axis>
                  <dx-crosshair
                    :horizontal-line="false"
                    :enabled="true"
                    color="#949494"
                    :width="1"
                    dashStyle="solid">

                  </dx-crosshair>


                  <dx-legend
                    vertical-alignment="top"
                    horizontal-alignment="center"
                    item-text-position="bottom"
                    @onLegendClick="onLegendClick($event)"
                  />



                  <dx-tooltip
                    :enabled="showTooltip"
                    :customize-tooltip="customizeTooltip"
                  />
                </dx-chart>

               </span>

                <!--HERE IS STARTING DIALOG CODE-->
                <v-card style="padding-top: 20px">
                  <v-flex d-flex>
                  <p><em>Pressure [bar] </em> </p>


                  <v-card-text>
                    <dx-chart

                      id="chart12"
                      :data-source="dataChart.sources" >
                      <dx-common-series-settings
                        :type="type"
                        argument-field="x"
                      />


                      <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 1'"
                        argument-field="x"
                        :value-field="dataChart.sourcesInfo[0].value"
                        :name="dataChart.sourcesInfo[0].name" >
                        <DxPoint :visible="false" />
                      </dx-series>
                      <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 2'"
                        argument-field="x"
                        :value-field="dataChart.sourcesInfo[1].value"
                        :name="dataChart.sourcesInfo[1].name" >
                        <DxPoint :visible="false" />
                      </dx-series>
                      <dx-series v-if="currentItem==='Cylinder 3'"
                        argument-field="x"
                        :value-field="dataChart.sourcesInfo[2].value"
                        :name="dataChart.sourcesInfo[2].name" >
                        <DxPoint :visible="false" />
                      </dx-series>
                      <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 4'"
                        argument-field="x"
                        :value-field="dataChart.sourcesInfo[3].value"
                        :name="dataChart.sourcesInfo[3].name" >
                        <DxPoint :visible="false" />
                      </dx-series>
                      <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 5'"
                        argument-field="x"
                        :value-field="dataChart.sourcesInfo[4].value"
                        :name="dataChart.sourcesInfo[4].name" >
                        <DxPoint :visible="false" />
                      </dx-series>
                      <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 6'"
                        argument-field="x"
                        :value-field="dataChart.sourcesInfo[5].value"
                        :name="dataChart.sourcesInfo[5].name" >
                        <DxPoint :visible="false" />
                      </dx-series>
                      <dx-series
                        argument-field="x"
                        :value-field="dataChart.sourcesInfo[6].value"
                        :name="dataChart.sourcesInfo[6].name" >
                        <DxPoint :visible="false" />
                      </dx-series>


                      <dx-margin :bottom="20"/>
                      <dx-argument-axis

                        :value-margins-enabled="false"
                        discrete-axis-division-mode="crossLabels"
                      >
                        <dx-constant-line value=0
                                          color="white"
                                          :width=0.3 />
                      </dx-argument-axis>
                      <dx-value-axis
                      >

                        <dx-grid :visible="true"
                                 :opacity="0.3" />
                      </dx-value-axis>
                      <dx-crosshair
                        :horizontal-line="false"
                        :enabled="true"
                        color="#949494"
                        :width="1"
                        dashStyle="solid">

                      </dx-crosshair>


                      <dx-legend
                        vertical-alignment="top"
                        horizontal-alignment="center"
                        item-text-position="bottom"
                        @onLegendClick="onLegendClick($event)"
                      />



                      <dx-tooltip
                        :enabled="showTooltip"
                        :customize-tooltip="customizeTooltip"
                      />
                    </dx-chart>

                   </v-card-text>
                  </v-flex>

                  <div  style="margin-right: 20px; margin-top: -20px; text-align: right">
                    <em>Crank Angle[deg] </em>
                  </div>

                <v-divider></v-divider>


                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>



               </v-card>

              <!--HERE IS ENDING-->

             </v-dialog>

        </v-flex>

    </v-card-actions>

    <div v-if="select === 'Pressure Trace'"
         style="margin-right: 20px; text-align: right">
      <em>Crank Angle[deg] {{currentItem}} </em>
    </div>



    <!--PRESSURE TRACE (FIRING ORDER) -->

    <v-card-actions
      v-if="select === 'Pressure Trace (firing order)' ">


      <v-flex   d-flex style="margin-top: -25px">
        <p><em>Pressure [bar]</em> </p>


        <v-dialog
          v-model="dialog"
          width="750"
        >

          <span slot="activator">

          <dx-chart
            :id="chartId[1]"
            :data-source="dataChart.sources2"

          >
            <dx-common-series-settings
              argument-field="x"
              type="spline"
            />

            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 1'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[0].value"
              :name="dataChart.sourcesInfo[0].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 2'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[1].value"
              :name="dataChart.sourcesInfo[1].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 3'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[2].value"
              :name="dataChart.sourcesInfo[2].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 4'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[3].value"
              :name="dataChart.sourcesInfo[3].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 5'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[4].value"
              :name="dataChart.sourcesInfo[4].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 6'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[5].value"
              :name="dataChart.sourcesInfo[5].name" >
              <DxPoint :visible="false" />
            </dx-series>


            <dx-margin :bottom="20"/>
            <dx-argument-axis
              :value-margins-enabled="false"
              discrete-axis-division-mode="crossLabels"
            >

            </dx-argument-axis>
            <dx-value-axis>
              <dx-grid :visible="true"
                       :opacity="0.3" />
            </dx-value-axis>
            <dx-crosshair
              :horizontal-line="false"
              :enabled="true"
              color="#949494"
              :width="1"
              dashStyle="solid">
            </dx-crosshair>


            <dx-legend
              vertical-alignment="top"
              horizontal-alignment="center"
              item-text-position="bottom"
              @onLegendClick="onLegendClick($event)"
            />

            <dx-tooltip
              :enabled="showTooltip"
              :customize-tooltip="customizeTooltip"
            />
          </dx-chart>

          </span>

          <!--HERE IS STARTING DIALOG CODE-->
          <v-card style="padding-top: 20px">
            <v-flex d-flex>

              <p><em>Pressure [bar] </em> </p>



              <dx-chart
                id="chart22"
                :data-source="dataChart.sources2"

              >
                <dx-common-series-settings
                  argument-field="x"
                  type="spline"
                />

                <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 1'"
                  argument-field="x"
                  :value-field="dataChart.sourcesInfo[0].value"
                  :name="dataChart.sourcesInfo[0].name" >
                  <DxPoint :visible="false" />
                </dx-series>
                <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 2'"
                  argument-field="x"
                  :value-field="dataChart.sourcesInfo[1].value"
                  :name="dataChart.sourcesInfo[1].name" >
                  <DxPoint :visible="false" />
                </dx-series>
                <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 3'"
                  argument-field="x"
                  :value-field="dataChart.sourcesInfo[2].value"
                  :name="dataChart.sourcesInfo[2].name" >
                  <DxPoint :visible="false" />
                </dx-series>
                <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 4'"
                  argument-field="x"
                  :value-field="dataChart.sourcesInfo[3].value"
                  :name="dataChart.sourcesInfo[3].name" >
                  <DxPoint :visible="false" />
                </dx-series>
                <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 5'"
                  argument-field="x"
                  :value-field="dataChart.sourcesInfo[4].value"
                  :name="dataChart.sourcesInfo[4].name" >
                  <DxPoint :visible="false" />
                </dx-series>
                <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 6'"
                  argument-field="x"
                  :value-field="dataChart.sourcesInfo[5].value"
                  :name="dataChart.sourcesInfo[5].name" >
                  <DxPoint :visible="false" />
                </dx-series>


                <dx-margin :bottom="20"/>
                <dx-argument-axis
                  :value-margins-enabled="false"
                  discrete-axis-division-mode="crossLabels"
                >

                </dx-argument-axis>
                <dx-value-axis>
                  <dx-grid :visible="true"
                           :opacity="0.3" />
                </dx-value-axis>
                <dx-crosshair
                  :horizontal-line="false"
                  :enabled="true"
                  color="#949494"
                  :width="1"
                  dashStyle="solid">
                </dx-crosshair>


                <dx-legend
                  vertical-alignment="top"
                  horizontal-alignment="center"
                  item-text-position="bottom"
                  @onLegendClick="onLegendClick($event)"
                />

                <dx-tooltip
                  :enabled="showTooltip"
                  :customize-tooltip="customizeTooltip"
                />
              </dx-chart>


            </v-flex>

            <div  style="margin-right: 20px; text-align: right; margin-top: -20px">
              <em>Crank Angle[deg] </em>
            </div>

            <v-divider></v-divider>


            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>

          </v-card>

        </v-dialog>

      </v-flex>
    </v-card-actions>

    <div v-if="select === 'Pressure Trace (firing order)'"
         style="margin-right: 20px; text-align: right">
      <em>Crank Angle[deg] </em>
    </div>






    <!--PRESSURE VS VOLUME-->

    <v-card-actions v-if="select === 'Pressure vs Volume'">

      <v-flex  d-flex style="margin-top: -25px">
        <p><em>Pressure [bar]</em> </p>


        <v-dialog
          v-model="dialog"
          width="750"
        >

          <span slot="activator">


            <dx-chart

              :id="chartId[2]"
              :data-source="dataChart.sources3" >
            <dx-common-series-settings
              type="spline"
              argument-field="x"
            />

            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 1'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[0].value"
              :name="dataChart.sourcesInfo[0].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 2'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[1].value"
              :name="dataChart.sourcesInfo[1].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 3'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[2].value"
              :name="dataChart.sourcesInfo[2].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 4'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[3].value"
              :name="dataChart.sourcesInfo[3].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 5'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[4].value"
              :name="dataChart.sourcesInfo[4].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 6'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[5].value"
              :name="dataChart.sourcesInfo[5].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series
              argument-field="x"
              :value-field="dataChart.sourcesInfo[6].value"
              :name="dataChart.sourcesInfo[6].name" >
              <DxPoint :visible="false" />
            </dx-series>


            <dx-margin :bottom="20"/>
            <dx-argument-axis
              :value-margins-enabled="false"
              discrete-axis-division-mode="crossLabels">
            </dx-argument-axis>
            <dx-value-axis>
              <dx-grid :visible="true"
                       :opacity="0.3" />
            </dx-value-axis>
            <dx-crosshair
              :horizontal-line="false"
              :enabled="true"
              color="#949494"
              :width="1"
              dashStyle="solid">
            </dx-crosshair>


            <dx-legend
              vertical-alignment="top"
              horizontal-alignment="center"
              item-text-position="bottom"
              @onLegendClick="onLegendClick($event)"
            />



            <dx-tooltip
              :enabled="showTooltip"
              :customize-tooltip="customizeTooltip"
            />
          </dx-chart>

          </span>

          <!--HERE IS STARTING DIALOG CODE-->
          <v-card style="padding-top: 20px">
          <v-flex d-flex>

          <p><em>Pressure [bar] </em></p>

          <dx-chart

            id="chart32"
            :data-source="dataChart.sources3">
            <dx-common-series-settings
              type="spline"
              argument-field="x"
            />

            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 1'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[0].value"
              :name="dataChart.sourcesInfo[0].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 2'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[1].value"
              :name="dataChart.sourcesInfo[1].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 3'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[2].value"
              :name="dataChart.sourcesInfo[2].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 4'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[3].value"
              :name="dataChart.sourcesInfo[3].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 5'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[4].value"
              :name="dataChart.sourcesInfo[4].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series  v-if="currentItem==='detailedView' | currentItem==='Cylinder 6'"
              argument-field="x"
              :value-field="dataChart.sourcesInfo[5].value"
              :name="dataChart.sourcesInfo[5].name" >
              <DxPoint :visible="false" />
            </dx-series>
            <dx-series
              argument-field="x"
              :value-field="dataChart.sourcesInfo[6].value"
              :name="dataChart.sourcesInfo[6].name" >
              <DxPoint :visible="false" />
            </dx-series>


            <dx-margin :bottom="20"/>
            <dx-argument-axis
              :value-margins-enabled="false"
              discrete-axis-division-mode="crossLabels"
            >

            </dx-argument-axis>
            <dx-value-axis
            >

              <dx-grid :visible="true"
                       :opacity="0.3" />
            </dx-value-axis>
            <dx-crosshair
              :horizontal-line="false"
              :enabled="true"
              color="#949494"
              :width="1"
              dashStyle="solid">

            </dx-crosshair>


            <dx-legend
              vertical-alignment="top"
              horizontal-alignment="center"
              item-text-position="bottom"
              @onLegendClick="onLegendClick($event)"
            />



            <dx-tooltip
              :enabled="showTooltip"
              :customize-tooltip="customizeTooltip"
            />
          </dx-chart>
          </v-flex>

          <div v-if="select === 'Pressure vs Volume'"
               style="margin-right: 20px; margin-top: -20px; text-align: right">
            <em>Volume [m^3] </em>
          </div>

          <v-divider></v-divider>


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>

          </v-card>

        </v-dialog>

      </v-flex>


    </v-card-actions>

    <div v-if="select === 'Pressure vs Volume'"
         style="margin-right: 20px; text-align: right">
      <em>Volume [m^3]</em>
    </div>

  </v-responsive>
</template>

<script>
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
  } from 'devextreme-vue/chart';

  import { DxButton, } from "devextreme-vue/button";
  import {DxTextBox}  from "devextreme-vue";

  ///////////////   http://localhost:8092/HyperCubeData/{{counter}}

  export default {
    name: "LineChart",
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
      DxButton,
      DxTextBox,
      DxConstantLine
    },
    props: {
      dataChart: {'sourcesInfo': Array, 'sources': Array, 'sources2': Array,  'sources3': Array },
      counter: Number,
      currentItem: String,
    },
    data: function () {
      return {
        select: "Pressure Trace",
        itemsOfSelect: (this.currentItem==='detailedView') ?
          ["Pressure Trace", "Pressure Trace (firing order)" , "Pressure vs Volume"] :
          ["Pressure Trace",  "Pressure vs Volume"],
        type: 'spline',
        showTooltip: true,
        text: "text",
        chartId: (this.currentItem==='detailedView') ?
          ["chart11",            "chart21",            "chart31", ] :
          ["chart11_oneCylinder","chart21_oneCylinder","chart31_oneCylinder", ],
        dialog: false,
        handleFocusIn: () => {
          this.text = 'focused!';
        },
        onLegendClick (e) {
          this.series = e.target;
          if (this.series.isVisible()) {
            this.series.hide();
          } else {
            this.series.show();
          }
        },
      }
    },

    methods: {
      customizeTooltip: (arg) => {
        return {
          text: arg.valueText
        };
      },

      toggleTooltip() {
        this.showTooltip = !this.showTooltip;
      }
    },


  }
</script>

<style scoped>
  #chart11 {
    height: 400px;
    width: 500px;
  }
  #chart11_oneCylinder {
    height: 400px;
    width: 1100px;
  }
  #chart21 {
    height: 400px;
    width: 500px;
  }
  #chart21_oneCylinder {
    height: 400px;
    width: 1100px;
  }
  #chart31 {
    height: 400px;
    width: 500px;
  }
  #chart31_oneCylinder {
    height: 400px;
    width: 1100px;
  }
  #chart12 {
    /*height: 400px;*/
    width: 700px;
  }
  #chart22 {
    /*height: 400px;*/
    width: 700px;
  }
  #chart32 {
    /*height: 400px;*/
    width: 700px;
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

