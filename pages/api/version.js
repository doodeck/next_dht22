// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pckg from '../../package.json'

export default function handler(req, res) {
  res.status(200).json({ version: pckg.version })
}
