const mongoose = require('mongoose')
const Info = require('./info')

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

countrySchema.pre('remove', function(next) {
  Info.find({ country: this.id }, (err, infos) => {
    if (err) {
      next(err)
    } else if (infos.length > 0) {
      next(new Error('This country has infos still'))
    } else {
      next()
    }
  })
})

module.exports = mongoose.model('Country', countrySchema)