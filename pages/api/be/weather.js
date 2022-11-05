// weather.js

const weather = require('../../../be/lib/weather-api')
const auth = require('../../../be/lib/authentication.js')

/*
app.get('/weather', function (req, res) { // test weather api connection
    weather.logWeather()
    res.sendStatus(200)
})
*/

export default function handler(req, res) {
    console.log('weather.js:handler')
    auth(req, res, () => {
        weather.logWeather((err) => {
            if (!!err) {
                console.err(JSON.stringify(err))
            }
            res.status(200).json({ status: !!err ? 'error': 'OK!' })
        })
    })
/*
    weather.getWeather((json) => {
        // console.log(JSON.stringify(json))
        res.status(200).json(json)
    })
    */
}
