import config from 'config'
import mongoose from 'mongoose'
import mongooseLong from 'mongoose-long'
mongooseLong(mongoose)
const NumberLong = mongoose.Schema.Types.Long
let user = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    }, // 真实姓名
    phone: {
        type: String,
        default: ""
    }, // 电话号码
    address: {
        type: String,
        default: ""
    }, // 地址
    created: {
        type: NumberLong,
        required: true
    }, // 创建时间
    modified: {
        type: NumberLong,
        required: true
    } // 修改时间
}, {
    safe: true,
    versionKey: false
})

if(config.get("mongodb.index")) {
    user.index({created:-1})
    user.index({modified:-1})
}

export default user