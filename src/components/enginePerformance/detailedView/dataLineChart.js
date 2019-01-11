
// there is no need of this file except from showing the structure of
// the data for LineChart
const sourcesInfo2 = [
  { value: 'cyl1', name: 'Cylinder 1' },
  { value: 'cyl2', name: 'Cylinder 2' },
  { value: 'ref',  name: 'Reference' },
];

const dataChart_sources = [
  { "crankAngle": "-180", "cyl1": 4.1567, "cyl2": 4.1572, "ref": 2.245000953814695 }, { "crankAngle": "-178", "cyl1": 4.1562, "cyl2": 4.1567, "ref": 2.2445674306894032 }, { "crankAngle": "-176", "cyl1": 4.1557, "cyl2": 4.1558, "ref": 2.2438451052701556 }, { "crankAngle": "-174", "cyl1": 4.1552, "cyl2": 4.1551, "ref": 2.2427078991035203 }, { "crankAngle": "-172", "cyl1": 4.1548, "cyl2": 4.1539, "ref": 2.242350287154896 }
];

const dataChart_sourcesInfo =  [ { "value": "cyl1", "name": "Cylinder 1" }, { "value": "cyl2", "name": "Cylinder 2" }, { "value": "ref", "name": "Reference" } ];


const sourcesInfo = [
  { value: 'cylinder1', name: 'Cylinder 1' },
  { value: 'oil', name: 'Oil' },
  { value: 'gas', name: 'Natural gas' },
  { value: 'coal', name: 'Coal' },
  { value: 'nuclear', name: 'Nuclear' }
];


const sources = [{
  country: "-180.5",
  cylinder1: 59.8,
  oil: 937.6,
  gas: 582,
  coal: 564.3,
  nuclear: 187.9
}, {
  country: 'China',
  cylinder1: 74.2,
  oil: 308.6,
  gas: 35.1,
  coal: 956.9,
  nuclear: 11.3
}, {
  country: 'Russia',
  cylinder1: 40,
  oil: 128.5,
  gas: 361.8,
  coal: 105,
  nuclear: 32.4
}, {
  country: 'Japan',
  cylinder1: 22.6,
  oil: 241.5,
  gas: 64.9,
  coal: 120.8,
  nuclear: 64.8
}, {
  country: 'India',
  cylinder1: 19,
  oil: 119.3,
  gas: 28.9,
  coal: 204.8,
  nuclear: 3.8
}, {
  country: 'Germany',
  cylinder1: 6.1,
  oil: 123.6,
  gas: 77.3,
  coal: 85.7,
  nuclear: 37.8
}];

export default {
  getSourcesInfo() {
    return sourcesInfo;
  },
  getSourcesInfo2() {
    return sourcesInfo2;
  },
  getSources() {
    return sources;
  }
};
