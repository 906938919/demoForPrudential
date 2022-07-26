const fs = require('fs')
const path = require('path')

const goodModel = require('../../models/goods')
const cateModel = require('../../models/cates')
const socket = require('../../utils/socket')
const { time } = require('console')

class GoodController {
  // 查询商品列表
  static async getGoodList(ctx) {
    let { name, cate, page, size, min_price, max_price } = ctx.request.query
    page = parseInt(page || 1)
    size = parseInt(size || 10)
    const params = {
      name: new RegExp(name, 'img'),
      cate: cate || ''
    }
    if (!params.cate) delete params.cate
    const total = await goodModel.find(params).count()
    const list = await goodModel.find(params).limit(size).skip((page - 1) * size)
    ctx.body = { err: 0, msg: 'success', data: { total, list } }
  }

  // 获取商品品类
  static async getAllCate(ctx) {
    const list = await cateModel.find({})
    ctx.body = { err: 0, msg: 'success', data: { list } }
  }

  // 新增商品或编辑商品
  static async updateGood(ctx) {
    let { name, desc, img, price, cate, hot, id, user_id } = ctx.request.body
    // 数据校验
    const ele = {
      user_id,
      name,
      desc,
      price,
      cate,
      img: img || '',
      hot: hot || false,
      create_time: Date.now(),
      check_status: 0,
    }
    let info = null
    // 有id，表示编辑；没有id，表示新增。
    if (id) {
      info = await goodModel.updateOne({ _id: id }, ele)
    } else {
      info = await goodModel.insertMany([ele])
    }
    socket.emit('server', { user_id: 'admin', msg: '你有新消息了' })
    ctx.body = { err: 0, msg: 'success', data: { info } }
  }

  // 图片上传
  static async uploadImg(ctx) {
    // 接收图片（form-data）
    const file = ctx.request.files.good
    const readStream = fs.createReadStream(file.path)
    const filePath = `/cdn/${Date.now()}_${file.name}`
    const writeStream = fs.createWriteStream(path.resolve(__dirname, `../../public${filePath}`))
    await readStream.pipe(writeStream)
    // writeStream.on('close', fn)
    ctx.body = { err: 0, msg: 'success', data: { img: filePath } }
  }

  // 商品详情
  static async getGoodInfo(ctx) {
    let { id } = ctx.request.query
    console.log(id);
    const info = await goodModel.findOne({ _id: id })
    console.log(info);
    ctx.body = { err: 0, msg: 'success', data: { info } }
  }

  // 商品删除（支持批量删除）
  static async delGood(ctx) {
    let { ids } = ctx.request.body
    // ids += ';'
    console.log('ids', ids)
    let arr = ids.split(';').filter(e => e)
    for (let i = 0; i < arr.length; i++) {
      await goodModel.deleteOne({ _id: arr[i] })
    }
    ctx.body = { err: 0, msg: 'success', data: {} }
  }

  static async addGood(ctx) {
    let { name, img, price, cate, desc } = ctx.request.body
    let create_time = new Date().getTime()
    const ele = { name, img, price, cate, desc, create_time }
    await goodModel.insertMany([ele])
    ctx.body = { err: 0, msg: 'success', data: {} }
  }


  static async addGoodCate(ctx) {
    let { cate, cate_zh } = ctx.request.body
    const ele = { cate, cate_zh }
    //校验数据省略
    if (await cateModel.findOne({ cate })) {
      ctx.body = { err: 1, msg: '已有数据', data: {} }
    } else {
      await cateModel.insertMany([ele])
      ctx.body = { err: 0, msg: 'success', data: {} }
    }
  }

  static async delGoodCate(ctx) {
    let { _id } = ctx.request.body
    await cateModel.deleteOne({ _id })
    ctx.body = { err: 0, msg: 'success', data: {} }
  }

  static async updateGoodCate(ctx) {
    let { oid, cate, cate_zh } = ctx.request.body
    const ele = { cate, cate_zh }
    //校验数据省略
    if (await cateModel.findOne({ cate }) || await cateModel.findOne({ cate_zh })) {
      ctx.body = { err: 1, msg: '已有数据', data: {} }
    } else {
      await cateModel.updateOne({ _id: oid }, ele)
      ctx.body = { err: 0, msg: 'success', data: {} }
    }
  }
}

module.exports = GoodController
