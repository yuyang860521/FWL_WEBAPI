'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _baseDAO2 = require('./baseDAO');var _baseDAO3 = _interopRequireDefault(_baseDAO2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Save = function (_baseDAO) {(0, _inherits3.default)(Save, _baseDAO);
    function Save() {(0, _classCallCheck3.default)(this, Save);return (0, _possibleConstructorReturn3.default)(this, (Save.__proto__ || (0, _getPrototypeOf2.default)(Save)).call(this));

    }(0, _createClass3.default)(Save, [{ key: 'save', value: function save(

        params) {var
            data = params.data,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            return Model(data).save();
        } }, { key: 'batchSave', value: function batchSave(

        params) {var
            dataArr = params.dataArr,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            return Model.create(dataArr);
        } }]);return Save;}(_baseDAO3.default);exports.default = Save;
//# sourceMappingURL=save.js.map