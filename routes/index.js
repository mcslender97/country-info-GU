const express = require('express')
const router = express.Router()
const Info = require('../models/info')

router.get('/', async (req, res) => {
  let infos
  try {
    infos = await Info.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    infos = []
  }
  res.render('index', { infos: infos })
})

module.exports = router