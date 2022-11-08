// params.js

export default function handler(req, res) {
    console.log(JSON.stringify(req.headers))
    res.status(200).json({ status: 'OK' })
}
  