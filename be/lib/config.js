// config.js

const config = {
    url: 'https://api.openweathermap.org/data/2.5/weather',
    parameters: [
        'units=metric',
        'id=3083829', // city id - Szczecin
        `appid=${process.env.OPENWEATHER_KEY}`
    ],
    pollinterval: '1 hour' // '1 minutes' // format postgresql interval: https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-INTERVAL-INPUT
}

module.exports = {
    config: config
}