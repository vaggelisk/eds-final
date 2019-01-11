import axios         from 'axios';
import {EDS_Mapping} from "./dataEdsMapping";
import service       from "../components/enginePerformance/detailedView/dataLineChart";


const API_URL = 'http://localhost:8092';

export class getEnginePerformance {


  constructor( count ){
    this.count = count;
  }

  getDataFromHybercube() {
    const url3 = `${API_URL}/HyperCubeData/${this.count}`;
    console.log(url3);

    function transformStructureOfData(pT, cA ) {
      let len1 = cA.length;
      let len2 = pT.Expected.length;

      let len = Math.min(cA.length,  pT.Expected.length);


      // console.log(len);
      // console.log(len1);
      // console.log(len2);
      let s = [];
      // for (let j = 0; j < len; j++) {
      for (let j = 0; j < 5; j++) {
        let v = {
          crankAngle: cA[j],
          cyl1: pT["Cylinder 1"][j],
          cyl2: pT["Cylinder 2"][j],
          ref:  pT.Expected[j],
        };
        s.push(v);
      }

      return s;
    }

    return axios({
      method: 'get',
      url: url3,
      transformResponse: function (data,) {
        let myobj = JSON.parse(data);
        let len = Object.keys(myobj).length;

        let dataTransformed = {
          'pressureTrace': {
            'sourcesInfo': service.getSourcesInfo2(),
            'sources': transformStructureOfData(
              myobj.pressureTrace,
              myobj.crankAngle,
            )
          }
        };
        console.log(dataTransformed.pressureTrace.sources[0].crankAngle);
        return dataTransformed;
      }
    })
  }


  getDataFromTimeline() {
    const url2 = `${API_URL}/EDSTimelineData/${this.count}`;
    console.log(url2);

    function getArrangements(map) {
      return {
        'name':   map.longName,
        // 'xaxis': map.elementName, //den einai toso sta kala tous ta data, isws prostethei argotera
        'yaxis': map.unit
      };
    }
    function validateAndColor(val, ref, max, typeRef) {
      if (typeRef === "%diff"){
        max =  max/100
      }
      return  ( Math.abs( (val -  ref)/val ) < max  ) ? 0 : 1;
    }
    function getBarChartData( param, param2, hMatrix ) {
      let helperValueArray = hMatrix[param];
      // console.log(helperValueArray);
      let valueBarData = [];
      for (let i=0; i < 6; i++ ){
        valueBarData.push({
          'cylinder': (i+1).toString(),
          'value': helperValueArray[0][i].toFixed(2),
          'tag': validateAndColor(
            helperValueArray[0][i], helperValueArray[1][i], helperValueArray[3], helperValueArray[4]
          )
        });
      }
      // console.log(valueBarData);
      let arrangements = getArrangements( EDS_Mapping[param2] );
      return  {
        'arrangements'  : arrangements,
        'values': valueBarData,
      };
    }

    return axios({
      method: 'get',
      url: url2,
      transformResponse: function (data, ) {
        let myobj = JSON.parse(data);
        let len = Object.keys(myobj).length;
        let helperMatrix = myobj[Object.keys(myobj)[len - 1]];
        let detailedViewDataTransformed = {
          'Pmax' : getBarChartData( "Pmax",  "pmax",   helperMatrix ),
          'Pcomp': getBarChartData( "Pcomp", "pcomp",  helperMatrix ),
          'imep':  getBarChartData( "imep",  "imep1",  helperMatrix ),
          'Texh':  getBarChartData( "Texh",  "tExhC1", helperMatrix ),
        };

        return detailedViewDataTransformed;
      }
    })
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

        let typeRef = helperValueArray[4];
        let avg = (helperValueArray[0][0]) ? helperValueArray[0][0].toFixed(2) : 0;
        let ref = (helperValueArray[1][0]) ? helperValueArray[1][0].toFixed(2) : 0;
        let min = (typeRef === "%diff") ? helperValueArray[2]/100 : helperValueArray[2];
        let max = (typeRef === "%diff") ? helperValueArray[3]/100 : helperValueArray[3];

        // console.log(ref);
        // console.log(max);

        // let p =(avg -  ref)/avg;
        // console.log(p);
        let clr = (  Math.abs( (avg -  ref)/avg ) < max  ) ? "green" : "red";


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
            "color" : clr,
            "reference" : ref,
            "min": min,
            "max": max,
            "datapoints": {
              "value": datapoints.val,
              "valMin": datapoints.valMin,
              "valMax": datapoints.valMax,
              "labels": datapoints.labels,
            }
          },
        };
        return dataTransformed;
      },
    })
  }
}

