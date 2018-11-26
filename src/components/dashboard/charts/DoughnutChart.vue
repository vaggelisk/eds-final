<template>
        <!--<div>{{ doughnutChartData.data.datasets[0].data[0] }}</div>-->
        <canvas id="doughnut-chart"></canvas>
</template>

<script>
    import Chart             from 'chart.js'
    import axios             from 'axios'
    // import data              from  './doughnut-chart.js'

    export default {
        name: "DoughnutChart",
        data: function() {
            return {
                doughnutChartData: {
                    type: 'doughnut',
                    data: {
                        labels: ['State',],
                        datasets: [
                            {
                                label: 'Compression Pressure',
                                backgroundColor: ['green',],
                                data: [40, ],
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                const myDoughnutChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                });
               myDoughnutChart.datasets[0].data[0] = 180;
            },
            addData(chart, label, data) {
                chart.data.labels.push(label);
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.push(data);
                });
                chart.update();
            },
            getDoughnutChartApiData: function (x) {
                try {
                    // eslint-disable-next-line
                    console.log(x);
                    axios.get('http://localhost:8092/GetEDSWebData/20')
                        .then(
                            function (response) {
                                // eslint-disable-next-line
                                console.log(response.data.Card.Value);

                                let helper = [];
                                helper.push(response.data.EngineKPI.Value);
                                // eslint-disable-next-line
                                console.log(helper);

                        });
                } catch (error) {
                    // eslint-disable-next-line
                    console.error(error)
                }
            }
        },
        mounted () {
            axios
                .get('http://localhost:8092/GetEDSWebData/20')
                .then( (response)  => {
                        this.doughnutChartData = {
                            type: 'doughnut',
                            data: {
                                labels: ['State',],
                                datasets: [
                                    {
                                        label: 'Compression Pressure',
                                        backgroundColor: ['blue',],
                                        data: [response.data.EngineKPI.Value,],
                                    }
                                ]
                            }
                        };

                        this.createChart('doughnut-chart', this.doughnutChartData);
                        // this.addData(this.myDoughnutChart, 'Antistate', dataTrial)
                        // myDoughnutChart.datasets[0].data[0] = 180;
                    }
                );

        }
    }
</script>

<style scoped>

</style>