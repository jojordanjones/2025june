import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
  if (req.query.secret !== token) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  try {
    await res.revalidate('/');
    await res.revalidate('/dashboards');
    res.json({ revalidated: true });
  } catch (err) {
    res.status(500).send('Error revalidating');
  }
}
