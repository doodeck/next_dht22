// iot.js

const db = require("../../../be/db/db");
const auth = require('../../../be/lib/authentication.js')
const weather = require('../../../be/lib/weather-api')

/*
app.get('/', function (req, res) {
    console.log('received connection from: ', req.ip, req.ips)
    console.log('  Parameters: ', req.params)
    console.log('  Query: ', req.query)
    db.insert(req,res)
    weather.logWeather()
})*/

export default function handler(req, res) {
    console.log('iot.js:handler')
    auth(req, res, () => {
        weather.logWeather() // deliberately not waited for   
        db.insert(req,res)
    })
}