const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const U = require('../controllers/system/user')
const G = require('../controllers/system/good')
const C = require('../controllers/system/check')


const v = '/api/v1/element'

router
    .post(`${v}/login`, U.login)
    .get(`${v}/userinfo`, checkToken, U.getUserInfo)
    .get(`${v}/good/list`, checkToken, G.getGoodList)
    .get(`${v}/good/unchecked`, checkToken, C.getUncheckedGood)
    .post(`${v}/good/check`, checkToken, C.checkGood)

    .post(`${v}/good/addCate`, checkToken, G.addGoodCate)
    .post(`${v}/good/delCate`, checkToken, G.delGoodCate)
    .post(`${v}/good/updateCate`, checkToken, G.updateGoodCate)
    .get(`${v}/good/cates`, checkToken, G.getAllCate)
    .post(`${v}/good/update`, checkToken, G.updateGood)
    .post(`${v}/upload/img`, checkToken, G.uploadImg)
    .get(`${v}/good/info`, checkToken, G.getGoodInfo)
    .post(`${v}/good/del`, checkToken, G.delGood)
    .post(`${v}/good/add`, checkToken, G.addGood)

module.exports = router