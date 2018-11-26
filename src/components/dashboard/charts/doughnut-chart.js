import axios   from 'axios';


export default {
    data: {
        labels: ['State',],
        datasets: [
            {
                label: 'Compression Pressure',
                backgroundColor: ['green',],
                data: [40,],
            }
        ]
    },
    methods: {
        // getDoughnutChartData() {
        //     try {
        //         axios.get('http://localhost:8092/GetEDSWebData/20')
        //             .then(function(response) {
        //                 console.log(response.data);
        //                 console.log(response.data.Card.Value);
        //                 // console.log(response.data.EngineKPI);
        //                 // dataValuesArray.values(response.data.Card.Value);
        //                 var helper = [];
        //                 helper.push(response.data.EngineKPI.Value);
        //                 console.log(helper);
        //                 this.datasets.data = helper;
        //                 // console.log(response.status);
        //                 // console.log(response.headers);
        //                 // console.log(response.config);
        //                 // return  helper;
        //             });
        //         return this.datasets.data;
        //
        //     } catch (error) {
        //         console.error(error)
        //     }
        // }
    },

    // mounted() {
    //     this.init()
    // },
    // created: function () {
    //     conssole.log("created")
    // }
};

