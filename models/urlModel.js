var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var URLSchema = Schema({
    url: {type: String, required: true},
    tiny: {type: String, required: true}
});

module.exports = mongoose.model('URL', URLSchema);
