const express = require('express')
const router = express.Router()
const Info = require('../models/info')
const Country = require('../models/country')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// All Infos Route
router.get('/', async (req, res) => {
  let query = Info.find()
  if (req.query.name != null && req.query.name != '') {
    query = query.regex('name', new RegExp(req.query.name, 'i'))
  }
  // if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
  //   query = query.lte('lowestTempDate', req.query.publishedBefore)
  // }
  // if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
  //   query = query.gte('lowestTempDate', req.query.publishedAfter)
  // }
  try {
    const infos = await query.exec()
    res.render('infos/index', {
      infos: infos,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Info Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Info())
})

// Create Info Route
router.post('/', async (req, res) => {
  const info = new Info({
    name: req.body.name,
    country: req.body.country,
    lowestTempDate: new Date(req.body.lowestTempDate),
    highestTempDate: new Date(req.body.highestTempDate),
    lowestTemp: req.body.lowestTemp,
    highestTemp: req.body.highestTemp,
    description: req.body.description
  })
  saveCover(info, req.body.infor)

  try {
    const newInfo = await info.save()
    res.redirect(`infos/${newInfo.id}`)
  } catch {
    renderNewPage(res, info, true)
  }
})

// Show Info Route
router.get('/:id', async (req, res) => {
  try {
    const info = await Info.findById(req.params.id)
                           .populate('country')
                           .exec()
    res.render('infos/show', { info: info })
  } catch {
    res.redirect('/')
  }
})

// Edit Info Route
router.get('/:id/edit', async (req, res) => {
  try {
    const info = await Info.findById(req.params.id)
    renderEditPage(res, info)
  } catch {
    res.redirect('/')
  }
})

// Update Info Route
router.put('/:id', async (req, res) => {
  let info

  try {
    info = await Info.findById(req.params.id)
    info.name = req.body.name
    info.country = req.body.country
    info.lowestTempDate = new Date(req.body.lowestTempDate)
    info.highestTempDate = new Date(req.body.highestTempDate)
    info.lowestTemp = req.body.lowestTemp
    info.highestTemp = req.body.highestTemp
    info.description = req.body.description
    if (req.body.infor != null && req.body.infor !== '') {
      saveCover(info, req.body.infor)
    }
    await info.save()
    res.redirect(`/infos/${info.id}`)
  } catch {
    if (info != null) {
      renderEditPage(res, info, true)
    } else {
      redirect('/')
    }
  }
})

// Delete Info Page
router.delete('/:id', async (req, res) => {
  let info
  try {
    info = await Info.findById(req.params.id)
    await info.remove()
    res.redirect('/infos')
  } catch {
    if (info != null) {
      res.render('infos/show', {
        info: info,
        errorMessage: 'Could not remove info'
      })
    } else {
      res.redirect('/')
    }
  }
})

async function renderNewPage(res, info, hasError = false) {
  renderFormPage(res, info, 'new', hasError)
}

async function renderEditPage(res, info, hasError = false) {
  renderFormPage(res, info, 'edit', hasError)
}

async function renderFormPage(res, info, form, hasError = false) {
  try {
    const countrys = await Country.find({})
    const params = {
      countrys: countrys,
      info: info
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Info'
      } else {
        params.errorMessage = 'Error Creating Info'
      }
    }
    res.render(`infos/${form}`, params)
  } catch {
    res.redirect('/infos')
  }
}

function saveCover(info, inforEncoded) {
  if (inforEncoded == null) return
  const infor = JSON.parse(inforEncoded)
  if (infor != null && imageMimeTypes.includes(infor.type)) {
    info.inforImage = new Buffer.from(infor.data, 'base64')
    info.inforImageType = infor.type
  }
}

module.exports = router