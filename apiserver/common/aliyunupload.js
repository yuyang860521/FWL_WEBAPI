'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _aliyunSdk = require('aliyun-sdk');var _aliyunSdk2 = _interopRequireDefault(_aliyunSdk);
var _config = require('config');var _config2 = _interopRequireDefault(_config);
var _aliyunOssUploadStream = require('aliyun-oss-upload-stream');var _aliyunOssUploadStream2 = _interopRequireDefault(_aliyunOssUploadStream);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ossStream = (0, _aliyunOssUploadStream2.default)(new _aliyunSdk2.default.OSS({
  accessKeyId: _config2.default.get('aliyun.accessKeyId'),
  secretAccessKey: _config2.default.get('aliyun.secretAccessKey'),
  endpoint: _config2.default.get('aliyun.endpoint'),
  apiVersion: _config2.default.get('aliyun.apiVersion') }));var


AliUpload = function () {
  function AliUpload(key) {(0, _classCallCheck3.default)(this, AliUpload);
    this.upload = ossStream.upload({
      Bucket: _config2.default.get('aliyun.bucket.name'),
      Key: key });

    this.upload.minPartSize(_config2.default.get('aliyun.minPartSize'));
  }(0, _createClass3.default)(AliUpload, [{ key: 'getupload', value: function getupload()

    {
      return this.upload;
    } }]);return AliUpload;}();exports.default = AliUpload;
//# sourceMappingURL=aliyunupload.js.map