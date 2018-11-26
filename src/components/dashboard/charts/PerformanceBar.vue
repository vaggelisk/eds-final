<template>
    <canvas id="performance-dashboard-chart"></canvas>
</template>

<script>
    export default {
        name: "PerformanceBar",
        props: ['childPerformanceDataLoaded', 'performanceData'],
        data: function () {
            return {
                loading: true,
                performanceDataC: this.performanceData,
            }
        },
        methods: {
            createChart2(chartId) {
                // let data0 = this.performanceDataC.map( i => i.Value);
                const ctx = document.getElementById(chartId);
                const myChart2 = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: this.performanceDataC.map( i => i.Name),
                        datasets: [
                            {
                                label: '',
                                backgroundColor: 'green',
                                data : this.performanceDataC.map( i => i.Value)
                            }
                        ]
                    }
                });
            }
        },
        mounted () {
            this.loading = false;
            this.createChart2('performance-dashboard-chart')
        }

    }
</script>

<style scoped>

</style>