import axios from "axios";

const doughnutChartApiData = {
    methods: {
        getDoughnutChartData() {
            try {
                axios.get('http://localhost:8092/GetEDSWebData/20')
                    .then(function (response) {
                        console.log(response.data);
                        console.log(response.data.Card.Value);
                        // console.log(response.data.EngineKPI);
                        // dataValuesArray.values(response.data.Card.Value);
                         helper = [];
                        helper.push(response.data.EngineKPI.Value);
                        console.log(helper);
                        // console.log(response.status);
                        // console.log(response.headers);
                        // console.log(response.config);
                        return helper;
                    })

            } catch (error) {
                console.error(error)
            }
        }
    },
};



// export const doughnutChartApiData = {
//     type: 'doughnut',
//     data: {
//         labels: ['State', ],
//         datasets: [
//             {
//                 label: 'Compression Pressure',
//                 backgroundColor: [ 'green', ],
//                 data: [96.3, ],
//             }
//         ]
//     }
// };

// export default doughnutChartApiData;

