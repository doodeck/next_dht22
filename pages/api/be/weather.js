// weather.js

// code running WITHOUT authentication!!!

const weather = require('../../../be/lib/weather-api')

/*
app.get('/weather', function (req, res) { // test weather api connection
    weather.logWeather()
    res.sendStatus(200)
})
*/

export default function handler(req, res) {
    console.log('weather.js:handler')
    weather.logWeather()
    res.status(200).json({ status: 'OK' })
    /*
    weather.getWeather((json) => {
        // console.log(JSON.stringify(json))
        res.status(200).json(json)
    })
    */
}
