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
    // console.log('weather.js:handler')
    return new Promise((resolve) => {
        try {
            auth(req, res, (err) => {
                if (!err) {
                    weather.logWeather((err) => {
                        if (!!err) {
                            console.error(JSON.stringify(err))
                        }
                        res.status(200).json({ status: !!err ? 'error': 'OK' })
                    })
                } else {
                    throw err
                }
            })            
        } catch (error) {
            console.error(JSON.stringify(error));
            res.status(error.status || 500).send(error.message || 'Internal server error');
            return resolve()
        }
    })
/*
    weather.getWeather((json) => {
        // console.log(JSON.stringify(json))
        res.status(200).json(json)
    })
    */
}
