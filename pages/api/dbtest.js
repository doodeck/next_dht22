// dbtest.js

import { getFilteredTupleIds } from '../../lib/tuple'

export default function handler(req, res) {
  // don't release productively - DB strain risk getFilteredTupleIds()
  res.status(200).json({ status: 'OK' })
}
