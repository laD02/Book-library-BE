const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const Book = new Schema (
    {
        bookName : {type:String},
        image: {type:String},
        category: {type:String},
        description:{type:String},
        quantity:{type:Number},
        borrowerIds:{type:Array}
    },
    {
        timestamps:true
    }
)

Book.plugin(mongooseDelete, {overrideMethods:'all'})

module.exports = mongoose.model('Book', Book)