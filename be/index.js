// index.js

const express = require('express')
const auth = require('./authentication.js')
const db = require('./db/db.js')
const weather = require('./lib/weather-api')

const app = express()
const PORT = process.env.PORT || 5000;

// code running WITHOUT authentication!!!
app.get('/db', function (req, res) { // test DB connection
    db.test(req, res)
})

app.get('/weather', function (req, res) { // test weather api connection
    weather.logWeather()
    res.sendStatus(200)
})

// code wih auth
app.use(auth)

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    console.log('received connection from: ', req.ip, req.ips)
    console.log('  Parameters: ', req.params)
    console.log('  Query: ', req.query)
    db.insert(req,res)
    weather.logWeather()
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
