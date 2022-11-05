const db = require("../../../be/db/db");

// db.js

// code running WITHOUT authentication!!!
/*app.get('/db', function (req, res) { // test DB connection
    db.test(req, res)
})*/

export default function handler(req, res) {
    // don't release productively - DB strain risk getFilteredTupleIds()
    // res.status(200).json({ status: 'OK' })
    db.test(req, res)
  }
  
