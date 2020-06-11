const mongoose = require('mongoose');

const DevDataSchema = new mongoose.Schema({
    devname: {
    type: String,
    },
    operatingsystem: {
        type:String,
    },
    processor:{
        type:String, 
    },
    cpu:{
        type:String,
    },
    gpu:{
        type:String,
    },
    display:{
        type:String,
    },
    storageram:{
        type:String,
    },
    maincamera:{
        type:String,
    },
    frontcamera:{
        type:String,
    },
    videorecording:{
        type:String,
    },
    sensors:{
        type:String,
    },
    batterycapacity:{
        type:String,
    },
    chargingfeatures:{
        type:String,
    },
    devimg:{
        type:String,
    },
    price:{
        type:String,
    },
    shoplink:{
        type:String,
    },
    brand:{
        type:String,
    }
},
{collection: 'DevData'});

const DevData = mongoose.model('DevData', DevDataSchema);

module.exports = DevData;

