'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _dao = require('../../dao');var dao = _interopRequireWildcard(_dao);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

User = function () {
    function User() {(0, _classCallCheck3.default)(this, User);
        this.module = { modelName: 'user' };
    }(0, _createClass3.default)(User, [{ key: 'saveUser', value: function saveUser(

        params) {
            _lodash2.default.assignIn(params, this.module);
            return new dao.Save().save(params);
        } }]);return User;}();exports.default = User;
//# sourceMappingURL=user.js.map