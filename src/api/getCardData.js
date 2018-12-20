import axios from 'axios';


const API_URL = 'http://localhost:8092';
export class APIService {

  constructor(height){
    this.height = height;
    this.kati = " xcvcvbcbv";
  }

  getCardData() {
    const url = `${API_URL}/EDSMapping`;

    return axios({
      method: 'get',
      url: 'http://localhost:8092/EDSMapping',
      transformResponse: function (data) {
        // Do whatever you want to transform the data

        return data;
      },
    });
    //EDS_Parameter_Names.pmax.longName
    // axios.get(url).then(response => {
    //   this.kati = response.data.EDS_Parameter_Names.pmax.longName;
    //   console.log("vag")
    //   // return "fgkkfkjgk" + this.height + this.kati ;
    // });

    // return "fgkkfkjgk" + this.height + this.kati ;
  }
}

