// weather-api.js

const { config } = require('./config')
const https = require('https')
const db = require('../db/db.js')

function getWeather(callback) {
    const url = config.url + '?' + config.parameters.join('&')
    const req = https.get(url, (res) => {
        let json_response = '';
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
      
        if (res.statusCode == 200) {
            res.on('data', (d) => {
            // process.stdout.write(d);
            json_response += d;
            });

            res.on('end', () => { // close
                req.end()
                if (callback) {
                    callback(json_response)
                }
            })
        }
    })
    
    req.on('error', (e) => {
       console.error(e);
    })
    // req.end()
}

// run asynchroneously in background, response not needed
function logWeather() {
    db.getWeatherInterval((interval) => {
        if (interval > 0.) { // becomes positive when time since the latest DB table updated exceeds config.pollinterval
            getWeather((res) => {
                const weather_data = JSON.parse(res)
                // console.log('weather_data: ', weather_data)
                console.log('temp: ', weather_data.main.temp, 'hum: ', weather_data.main.humidity,
                            'pressure: ', weather_data.main.pressure)
                db.appendWeather(weather_data.main)
            })
        }
    })
}

module.exports = {
    getWeather: getWeather,
    logWeather: logWeather
}