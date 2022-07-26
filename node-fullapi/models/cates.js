const mongoose = require('mongoose')

module.exports =  mongoose.model('cates', mongoose.Schema({
  cate: String,     // 品类的英文名
  cate_zh: String,  // 品类的中文名
}))
