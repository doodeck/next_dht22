const db = require("../../../be/db/db");

// db.js

// code running WITHOUT authentication!!!
/*app.get('/db', function (req, res) { // test DB connection
    db.test(req, res)
})*/

export default function handler(req, res) {
    // you should never reject that Promise
    //   https://github.com/vercel/next.js/issues/10439#issuecomment-583214126
    return new Promise((resolve, reject) => {
        // don't release productively - DB strain risk getFilteredTupleIds()
        try {
            db.test(req, res, (err) => {
                return resolve()
            })
        } catch (error) {
            console.error(error);
            res.status(500).end();
            return resolve()
        }
    })
  }
  
