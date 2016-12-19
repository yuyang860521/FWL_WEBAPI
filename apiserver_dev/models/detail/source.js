import config from 'config'
import mongoose from 'mongoose'
import mongooseLong from 'mongoose-long'
mongooseLong(mongoose)
const NumberLong = mongoose.Schema.Types.Long
let source = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    }, // 资源名字
    type: {
        type: Number,
        required: true
    }, // 资源类型: 1图片， 2视频
    url: {
        type: String,
        required: true
    }, // 资源链接
    description: {
        type: String,
        default: ""
    }, // 资源描述
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
    source.index({type:1})
    source.index({created:-1})
    source.index({modified:-1})
}

export default source