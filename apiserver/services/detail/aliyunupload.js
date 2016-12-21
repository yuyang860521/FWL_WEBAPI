'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _aliyunSdk = require('aliyun-sdk');var _aliyunSdk2 = _interopRequireDefault(_aliyunSdk);
var _config = require('config');var _config2 = _interopRequireDefault(_config);
var _aliyunOssUploadStream = require('aliyun-oss-upload-stream');var _aliyunOssUploadStream2 = _interopRequireDefault(_aliyunOssUploadStream);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var ossStream = (0, _aliyunOssUploadStream2.default)(new _aliyunSdk2.default.OSS({
    accessKeyId: _config2.default.get('aliyun.accessKeyId'),
    secretAccessKey: _config2.default.get('aliyun.secretAccessKey'),
    endpoint: _config2.default.get('aliyun.endpoint'),
    apiVersion: _config2.default.get('aliyun.apiVersion') }));var


AliUpload = function () {
    function AliUpload() {(0, _classCallCheck3.default)(this, AliUpload);
    }(0, _createClass3.default)(AliUpload, [{ key: 'uploadfile', value: function uploadfile(

        file, folder) {
            return new _bluebird2.default(function (resolve, reject) {

                var upload = ossStream.upload({
                    Bucket: _config2.default.get('aliyun.bucket.name'),
                    Key: folder + "/" + new Date().getTime() + 1000 + parseInt(Math.random() * 9000) + _path2.default.extname(file.name) });

                upload.minPartSize(_config2.default.get('aliyun.minPartSize'));

                upload.on('uploaded', function (details) {
                    resolve(details);
                });

                upload.on('error', function (error) {
                    reject(error);
                });


                var read = _fs2.default.createReadStream(file.path);
                read.pipe(upload);
            });
        } }]);return AliUpload;}();exports.default = AliUpload;
//# sourceMappingURL=aliyunupload.js.map