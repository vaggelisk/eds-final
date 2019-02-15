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

    function transformStructureOfData(pT, xA ) {
      let len = Math.min(xA.length,  pT.Expected.length);
      let s = [];
      for (let j = 0; j < len; j++) {
        let v = {
          x: xA[j],
          cyl1: pT["Cylinder 1"][j],
          cyl2: pT["Cylinder 2"][j],
          cyl3: pT["Cylinder 3"][j],
          cyl4: pT["Cylinder 4"][j],
          cyl5: pT["Cylinder 5"][j],
          cyl6: pT["Cylinder 6"][j],
          ref:  pT.Expected[j],
        };
        s.push(v);
      }

      return s;
    }

    function transformStructureOfComplicatedData(pT, xA) {
      let s = [];
      let itemsx = [ "CA1", "CA2", "CA3", "CA4", "CA5", "CA6"];
      let itemsxvarname = [ "cyl1", "cyl2", "cyl3", "cyl4", "cyl5", "cyl6"];
      let itemsy = [  "Cylinder 1",  "Cylinder 2", "Cylinder 3", "Cylinder 4", "Cylinder 5", "Cylinder 6" ];

      for (let j = 0; j < 360; j = j + 0.5 ) {
        let v = {
          x: j.toString()
        };
        for (let i = 0; i < 6; i++ ) {
          if (xA[itemsx[i]].indexOf(j) !== -1) {
            let q = xA[itemsx[i]].indexOf(j);
            v[itemsxvarname[i]] = pT[itemsy[i]][q];
          }
        }
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
            ),
            'sources2': transformStructureOfComplicatedData(
              myobj.pressureTrace,
              myobj.crankAnglePerCyl,
            ),
            'sources3': transformStructureOfData(
              myobj.pressureTrace,
              myobj.volume,
            )
          }
        };
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
        'xaxis': map.elementName,
        'yaxis': '['+map.unit+']'
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
          'arg': (i+1).toString(),
          'value': helperValueArray[0][i],
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
          'imep' :  getBarChartData( "imep",  "imep1",  helperMatrix ),
          'Texh' :  getBarChartData( "Texh",  "tExhC1", helperMatrix ),
          'PressureRise': getBarChartData( "PressureRise", "pmaxPcomp", helperMatrix),
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

