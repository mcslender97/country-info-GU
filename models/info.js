const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

const infoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  lowestTempDate: {
    type: Date,
    required: true
  },
  lowestTemp:{
    type: mongoose.SchemaTypes.Decimal128,
    required: true
  },
  highestTempDate: {
    type: Date,
    required: true
  },
  highestTemp:{
    type: mongoose.SchemaTypes.Decimal128,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  inforImage: {
    type: Buffer,
    required: true
  },
  inforImageType: {
    type: String,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Country'
  }
  //add temp and date
})

infoSchema.virtual('inforImagePath').get(function() {
  if (this.inforImage != null && this.inforImageType != null) {
    return `data:${this.inforImageType};charset=utf-8;base64,${this.inforImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Info', infoSchema)