'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _config = require('config');var _config2 = _interopRequireDefault(_config);
var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongooseLong = require('mongoose-long');var _mongooseLong2 = _interopRequireDefault(_mongooseLong);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
(0, _mongooseLong2.default)(_mongoose2.default);
var NumberLong = _mongoose2.default.Schema.Types.Long;
var user = new _mongoose2.default.Schema({
    name: {
        type: String,
        default: "" },
    // 真实姓名
    phone: {
        type: String,
        default: "" },
    // 电话号码
    address: {
        type: String,
        default: "" },
    // 地址
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
    user.index({ created: -1 });
    user.index({ modified: -1 });
}exports.default =

user;
//# sourceMappingURL=user.js.map