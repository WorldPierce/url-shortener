var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  originalUrl: String,
  shorterUrl: String
  
}, {timeStamps: true});
//collection and schema
var ModelClass = mongoose.model('shortUrl', urlSchema);
//allows to access in server,js
module.exports = ModelClass;