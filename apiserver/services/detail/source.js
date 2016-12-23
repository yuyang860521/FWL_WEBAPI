'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _dao = require('../../dao');var dao = _interopRequireWildcard(_dao);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Source = function () {
    function Source() {(0, _classCallCheck3.default)(this, Source);
        this.module = { modelName: 'source' };
    }(0, _createClass3.default)(Source, [{ key: 'saveSource', value: function saveSource(

        params) {
            _lodash2.default.assignIn(params, this.module);
            return new dao.Save().batchSave(params);
        } }, { key: 'sourceList', value: function sourceList(

        params) {
            _lodash2.default.assignIn(params, this.module);
            return new dao.Get().find(params);
        } }, { key: 'totalCount', value: function totalCount(

        params) {
            _lodash2.default.assignIn(params, this.module);
            return new dao.Get().totalCount(params);
        } }, { key: 'delSource', value: function delSource(

        params) {
            _lodash2.default.assignIn(params, this.module);
            return new dao.Update().update(params);
        } }, { key: 'getSource', value: function getSource(

        params) {
            _lodash2.default.assignIn(params, this.module);
            return new dao.Get().findById(params);
        } }, { key: 'updateSource', value: function updateSource(

        params) {
            _lodash2.default.assignIn(params, this.module);
            return new dao.Update().update(params);
        } }]);return Source;}();exports.default = Source;
//# sourceMappingURL=source.js.map