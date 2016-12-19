'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _user = require('./detail/user');var _user2 = _interopRequireDefault(_user);
var _source = require('./detail/source');var _source2 = _interopRequireDefault(_source);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ControllerFactory = function ControllerFactory(type) {
    if (this instanceof ControllerFactory) {
        return new this[type]();
    } else {
        return new ControllerFactory(type);
    }
};

ControllerFactory.prototype = {
    Source: function Source() {
        return new _source2.default();
    },
    User: function User() {
        return new _user2.default();
    } };exports.default =


ControllerFactory;
//# sourceMappingURL=index.js.map