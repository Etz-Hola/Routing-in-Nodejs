const express = require('express')
const router = express.Router();
const path = require('path')


router.get('^/$|/index(.html)?', (reg, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})



router.get('/new-page(.html)?/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

router.get('/testing(.html)?/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'testing.html'))
})
