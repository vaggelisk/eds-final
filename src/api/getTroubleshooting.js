import axios         from 'axios';



const API_URL = 'http://localhost:8092';

export class getTroubleshooting {

  constructor( count ){
    this.count = count;
  }


  getDataFromEvents() {
    const url1 = `${API_URL}/EDSEvents/${this.count}`;
    console.log(url1);


    return axios({
      method: 'get',
      url: url1,
      transformResponse: function (data, ) {
        let myobj = JSON.parse(data);
        let len = Object.keys(myobj).length;
        // console.log(myobj.aggrEvents.events['code']);
        // console.log(myobj.kpi.Engine);
        let dataTransformed = {
          'currentFaults':  myobj.aggrEvents,
        };
        return dataTransformed;
      }
    })
  }
}
