const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockSchema = new Schema({
    name: { type: String},
    price: { type: String},
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const stockModel = mongoose.model("Stock", StockSchema);

module.exports = stockModel;
