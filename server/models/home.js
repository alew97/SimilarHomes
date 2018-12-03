const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  targetLatitude: { type: Number, required: true },
  targetLongitude: { type: Number, required: true },
  latitudeAway: { type: Number },
  longitudeAway: { type: Number },
  minBath: { type: Number },
  maxBath: { type: Number },
  minBed: { type: Number }, 
  maxBed: { type: Number },
  minFeet: { type: Number },
  maxFeet: { type: Number }, 
  pageNumber: { type: Number, required: true }
}, { collection : 'homes' });

homeSchema.plugin(mongoosePaginate);
 
const Home = mongoose.model('Home', homeSchema);

 
module.exports = Home;