'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_mongoose2.default.Promise = _bluebird2.default;var

BaseDAO = function () {
    function BaseDAO() {(0, _classCallCheck3.default)(this, BaseDAO);
    }(0, _createClass3.default)(BaseDAO, [{ key: 'getDBEngine', value: function getDBEngine(

        modelName) {
            return _mongoose2.default.model(modelName);
        } }]);return BaseDAO;}();exports.default = BaseDAO;
//# sourceMappingURL=baseDAO.js.map