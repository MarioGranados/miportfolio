const mongoose = require('mongoose');
const {Schema} = mongoose;

const StockSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}

})

const StockModel = mongoose.model('Stock', StockSchema);

module.exports =  StockModel;