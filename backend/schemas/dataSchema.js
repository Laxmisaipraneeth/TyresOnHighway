const mongoose = require("mongoose")

const predictionSchema = new mongoose.Schema({
    prediction:String,
    confidence:Number,
    toc:Date, // toc means time of occurance
    exit:String
})
const dataSchema = new mongoose.Schema(
    {
        registrationNo:String,
        mobileNo:String,
        occurances:[predictionSchema]
    }
)
const dataModel = mongoose.model('dataModel',dataSchema)

module.exports = dataModel