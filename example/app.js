const GW2 = require('../index');
const config =require('./config');

const client = new GW2(config.options);

client.request({action:"",params:{},body:{},setErrors:()=>{}})