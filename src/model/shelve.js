const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Shelve = new Schema (
    {
        shelveName:{type:String},
        bookIds:{type:Array}
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Shelve', Shelve)