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
    column: {
        type: Number,
        required: true
    }, // 栏目： 1视频， 2展示图片区， 3体育运动区， 4奶粉区
    url: {
        type: String,
        required: true
    }, // 资源链接
    description: {
        type: String,
        default: ""
    }, // 资源描述
    status: {
        type: Number,
        default: 1
    }, // 是否废弃： 1在用， 0废弃， 2下线
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
    source.index({status:-1})
    source.index({created:-1})
    source.index({modified:-1})
}

export default source