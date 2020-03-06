var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PokemonSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    height: {type: String, required: true, max: 100},
    weight: {type: String, required: true, max: 100},
    image_url: {type: String, required: true, max: 100},
  }
);



//Export model
module.exports = mongoose.model('Pokemon', PokemonSchema);