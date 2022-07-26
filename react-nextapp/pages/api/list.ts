// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  err: 0 | 1 | 2 | 3
  data: {
    list: Array<any>,
    total?: number
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const qfList = [
    { id: 1, name: 'HTML5' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Test' }
  ]
  res.status(200).json({ err: 0, data: { list: qfList, total: 4 } })
}
