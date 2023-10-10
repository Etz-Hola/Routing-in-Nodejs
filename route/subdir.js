//   ROUTING

const express = require('express');
const router = require.Router()
const path = require('path');



app.get('^/$|/index(.html)?', (reg, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})


app.get('/new-page(.html)?/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

module.exports = router 




