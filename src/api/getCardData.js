import axios from 'axios';


const API_URL = 'http://localhost:8092';

export class APIService {


  constructor(name){
    this.name = name;
  }

  getCardStaticData() {
    const url1 = `${API_URL}/EDSMapping`;
    const id = `${this.name}`;

    return axios({
      method: 'get',
      url: url1,
      transformResponse: function (data,  ) {
        // Do whatever you want to transform the data
        let myobj = JSON.parse(data);
        let dataTransformed = {
          d: myobj.EDS_Parameter_Names[ id ],
        };
        return dataTransformed;
      },
    })
  }

  getCardDynamicData( counter ) {
    const url2 = `${API_URL}/EDSTimelineData/${counter}`;
    const id = `${this.name}`;
    console.log(url2);
    return axios({
      method: 'get',
      url: url2,
      transformResponse: function (data,  ) {
        // Do whatever you want to transform the data
        let mydynamicobj = JSON.parse(data);
        let len = Object.keys(mydynamicobj).length;
        let helperMatrix = mydynamicobj[Object.keys(mydynamicobj)[len - 1]];
        let helperValueArray = helperMatrix[id];


        let avg = (helperValueArray[0][0]) ? helperValueArray[0][0] : 0;
        let ref = (helperValueArray[1][0]) ? helperValueArray[1][0] : 0;
        let min = helperValueArray[2];
        let max = helperValueArray[3];


        let datapoints = {"val": [], "valMin": [], "valMax": [], "labels": []};
        for (let j = 0; j < len; j++) {

          let helper = mydynamicobj[Object.keys(mydynamicobj)[j]];

          let valueDpArray = helper[id];
          let avgDp = (valueDpArray[0][0]) ? valueDpArray[0][0] : 0;
          let refDp = (valueDpArray[1][0]) ? valueDpArray[1][0] : 0;

          let minDp = valueDpArray[2];
          let maxDp = valueDpArray[3];
          let valMinDp = refDp / (1 - minDp / 100);
          let valMaxDp = refDp / (1 - maxDp / 100);

          datapoints.val.push(avgDp);
          datapoints.valMin.push(valMinDp);
          datapoints.valMax.push(valMaxDp);
          if (j < 10) {
            datapoints.labels.push('10.0' + j);
          } else {
            datapoints.labels.push('10.' + j);
          }
        }

        datapoints["val"] = datapoints["val"].map(function (each_element) {
          return Number(each_element.toFixed(2));
        });
        datapoints["valMin"] = datapoints["valMin"].map(function (each_element) {
          return Number(each_element.toFixed(2));
        });
        datapoints.valMax = datapoints.valMax.map(function (each_element) {
          return Number(each_element.toFixed(2));
        });

        let dataTransformed = {
          d: {
            "value" : avg,
            "color" : "green",
            "reference" : ref,
            "min": min,
            "max": max,
            "datapoints": datapoints,
          },
        };
        return dataTransformed;
      },
    })
  }
}

