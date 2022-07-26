import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  err: 0 | 1 | 2 | -1,
  msg: string,
  data: {
    info: {
      id: number,
      name: string,
      content: string,
      [key: string]: any
    }
  }
}

// 动态接口
// req 表示请求体对象，拿到入参（req.query/req.body），拿到请求方法（req.method）
// res 表示响应体对象，res.send()/res.json()...
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 接入入参、入参验证、非必填参数处理
  const { name } = req.query
  // 增删改查
  const info = {
    id: Date.now(),
    name: String(name),
    content: '报名千锋，迎取高富帅'
  }
  // 响应请示方
  res.status(200).json({ err: 0, msg: 'success', data: { info } })
}