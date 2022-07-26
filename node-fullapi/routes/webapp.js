const KoaRouter = require('@koa/router')
const router = new KoaRouter()

// 用于鉴权的
const checkToken = require('../middlewares/checkToken')

// 指定接口的版本
const v = '/api/v1/vant'

// 接口的业务逻辑
const U = require('../controllers/webapp/user')
const G = require('../controllers/webapp/good')
const C = require('../controllers/webapp/cart')

// RESTful API 规范（一种需要鉴权，一种不需要鉴权）
// 接口访问示例：localhost:9999/api/v1/vant/user/regist
router
.post(`${v}/user/regist`, U.regist)
.post(`${v}/user/login`, U.login)
.get(`${v}/good/list`, G.getGoodList)
.get(`${v}/good/cates`, G.getAllCates)
.get(`${v}/good/info`, G.getGoodInfo)

.post(`${v}/cart/add`, checkToken, C.addToCart)
.get(`${v}/cart/list`, checkToken, C.getCartList)
.get(`${v}/cart/delete`, checkToken, C.delCartItem)
.get(`${v}/cart/update`, checkToken, C.updCartCount)
.post(`${v}/cart/submit`, checkToken, C.submitCart)

module.exports = router
