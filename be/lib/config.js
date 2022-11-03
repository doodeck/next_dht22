// config.js

const config = {
    url: 'https://api.openweathermap.org/data/2.5/weather',
    parameters: [
        'units=metric',
        'id=3083829', // city id - Szczecin
        `appid=${process.env.OPENWEATHER_KEY}`
    ],
    pollinterval: '1 hour' // format postgresql interval
}

module.exports = {
    config: config
}