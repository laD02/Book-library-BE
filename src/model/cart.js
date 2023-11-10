const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Cart = new Schema (
    {
        cartName: {type:String},
        bookList :{type:Array},
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Cart', Cart)