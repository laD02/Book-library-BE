const mongoose = require('mongoose')

const Schema = mongoose.Schema
const History = new Schema(
    {
        historyName:{type:String},
        historyList:{type:Array}
    }
)

module.exports = mongoose.model('History', History)
