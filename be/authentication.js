// authentication.js

// const auth = require('./credentials.js')

// env variable : komma separated values, eg. AUTH_IDS="************,************"
var auth_ids = process.env.AUTH_IDS.split(","); // [ "************", "************" ]
// MAC addresses (without colon) which are allowed to connect, e.g. "12ab34cd56ef"

module.exports = function (req, res, next) {
    // console.log(req)
    console.log('auth ids:', auth_ids);

    const found = auth_ids.find(id => id === req.query.id)
    if (typeof found !== 'undefined' && found.length > 0) {
        next()
    } else {
        console.error('Unauthorized id:', req.query.id)
        res.sendStatus(401)
    }
}

// module.exports = authenticate;
