const goodModel = require('../../models/goods')
const socket = require('../../utils/socket')

class CheckController {
    //查询未审批的商品
    static async getUncheckedGood(ctx) {
        const list = await goodModel.find({ check_status: 0 })
        ctx.body = ctx.body = { err: 0, msg: 'success', data: { list } }
    }

    //审批商品
    static async checkGood(ctx) {
        let { _id, check_status } = ctx.request.body
        const ele = {
            check_status,
        }
        let info = null;
        await goodModel.updateOne({ _id }, ele)
        info = await goodModel.findOne({ _id })
        socket.emit('server', { user_id: info.user_id, msg: '你有新消息了' })
        ctx.body = { err: 0, msg: 'success', data: { info } }
    }
}

module.exports = CheckController