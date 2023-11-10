const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Athor = new Schema(
    {
        name:{type: String},
        password: {type:String},
        email:{type:String},
        birthDay: {type: String},
        gentleId: {type: String},
        description:{type:String}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Athor', Athor)