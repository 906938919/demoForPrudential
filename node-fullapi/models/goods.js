const mongoose = require('mongoose')

module.exports = mongoose.model('goods', mongoose.Schema({
  user_id: String,//上传商品的用户和id
  name: String,
  desc: String,
  img: String,
  price: Number,
  cate: String,
  hot: { type: Boolean, default: false },
  rank: { type: Number, default: 0 },
  create_time: Number,
  status: { type: Number, default: 1 },
  check_status: { type: Number, default: 0 },//0为已上传未审批，1为审批通过，-1为审批未通过
}))
