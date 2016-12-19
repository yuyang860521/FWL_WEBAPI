'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _config = require('config');var _config2 = _interopRequireDefault(_config);
var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongooseLong = require('mongoose-long');var _mongooseLong2 = _interopRequireDefault(_mongooseLong);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
(0, _mongooseLong2.default)(_mongoose2.default);
var NumberLong = _mongoose2.default.Schema.Types.Long;
var source = new _mongoose2.default.Schema({
    name: {
        type: String,
        default: "" },
    // 资源名字
    type: {
        type: Number,
        required: true },
    // 资源类型: 1图片， 2视频
    url: {
        type: String,
        required: true },
    // 资源链接
    description: {
        type: String,
        default: "" },
    // 资源描述
    created: {
        type: NumberLong,
        required: true },
    // 创建时间
    modified: {
        type: NumberLong,
        required: true }
    // 修改时间
}, {
    safe: true,
    versionKey: false });


if (_config2.default.get("mongodb.index")) {
    source.index({ type: 1 });
    source.index({ created: -1 });
    source.index({ modified: -1 });
}exports.default =

source;
//# sourceMappingURL=source.js.map