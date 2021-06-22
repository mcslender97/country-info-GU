const express = require('express')
const router = express.Router()
const Country = require('../models/country')
const Info = require('../models/info')

// New Country Route
router.get('/new', (req, res) => {
    res.render('countrys/new', { country: new Country() })
})

// All Countrys Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const countrys = await Country.find(searchOptions)
        res.render('countrys/index', {
            countrys: countrys,
            searchOptions: req.query,
        })
    } catch {
        res.redirect('/')
    }
})

// Create Country Route
router.post('/', async (req, res) => {
    const country = new Country({
        name: req.body.name,
    })
    try {
        const newCountry = await country.save()
        res.redirect(`countrys/${newCountry.id}`)
    } catch {
        res.render('countrys/new', {
            country: country,
            errorMessage: 'Error creating Country',
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const country = await Country.findById(req.params.id)
        const infos = await Info.find({ country: country.id }).limit(6).exec()
        res.render('countrys/show', {
            country: country,
            infosByCountry: infos,
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const country = await Country.findById(req.params.id)
        res.render('countrys/edit', { country: country })
    } catch {
        res.redirect('/countrys')
    }
})

router.put('/:id', async (req, res) => {
    let country
    try {
        country = await Country.findById(req.params.id)
        country.name = req.body.name
        await country.save()
        res.redirect(`/countrys/${country.id}`)
    } catch {
        if (country == null) {
            res.redirect('/')
        } else {
            res.render('countrys/edit', {
                country: country,
                errorMessage: 'Error updating Country',
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let country
    try {
        country = await Country.findById(req.params.id)
        await country.remove()
        res.redirect('/countrys')
    } catch {
        if (country == null) {
            res.redirect('/')
        } else {
            res.redirect(`/countrys/${country.id}`)
        }
    }
})

module.exports = router
