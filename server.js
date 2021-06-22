const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const countryRouter = require('./routes/countrys')
const infoRouter = require('./routes/infos')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost/countryMongo'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

//Get the default connection
const db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/countrys', countryRouter)
app.use('/infos', infoRouter)

app.listen(process.env.PORT || 3100)
