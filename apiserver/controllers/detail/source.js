'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _retMsg = require('../../common/retMsg');var _retMsg2 = _interopRequireDefault(_retMsg);
var _services = require('../../services');
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SourceController = function SourceController() {
    if (!(this instanceof SourceController)) {
        return new SourceController();
    }

    /**
       * 保存上传资源信息 post
       * URL /api/source/save
       * params:
       *          name
       *          column
       *          desc
       *          pathstr 
       *          type
       *
       *
       * 说明：
       *      name 资源标题
       *      column 图片所属栏目
       *      type 资源类型： 1图片， 2视频
       *      pathstr 图片在阿里云的路径字符串，多张图以逗号分隔
       *      desc 图片描述
       *
       * return {errcode:xxx, errmsg:xxx}
       */
    this.saveSource = function () {var _this = this;
        return function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {var _ctx$request$body, name, column, desc, pathstr, type, currTime, arr, i, params, sourceService;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_ctx$request$body =
                                ctx.request.body, name = _ctx$request$body.name, column = _ctx$request$body.column, desc = _ctx$request$body.desc, pathstr = _ctx$request$body.pathstr, type = _ctx$request$body.type;

                                currTime = new Date().getTime();
                                arr = pathstr.split(",");
                                for (i = 0; i < arr.length; i++) {
                                    if (arr[i]) {
                                        arr[i] = { name: name, url: arr[i], column: parseInt(column), type: parseInt(type), description: desc, created: currTime, modified: currTime };
                                    }
                                }

                                params = {
                                    dataArr: arr };


                                sourceService = new _services.Source();_context.next = 8;return (
                                    sourceService.saveSource(params));case 8:
                                ctx.body = _retMsg2.default.getErrorNotice('SUCCESS');case 9:case 'end':return _context.stop();}}}, _callee, _this);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();

    };

    this.sourceList = function () {var _this2 = this;
        return function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {var _ctx$query, type, start, limit, params, sourceService, result, datas;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_ctx$query =
                                ctx.query, type = _ctx$query.type, start = _ctx$query.start, limit = _ctx$query.limit;

                                params = {
                                    conditions: {
                                        type: parseInt(type) },

                                    columns: {
                                        _id: 1,
                                        url: 1 },

                                    start: parseInt(start),
                                    limit: parseInt(limit),
                                    sort: {
                                        modified: -1 } };


                                sourceService = new _services.Source();

                                result = void 0;_context2.next = 6;return (
                                    sourceService.sourceList(params));case 6:datas = _context2.sent;
                                if (_lodash2.default.isArray(datas) && datas.length > 0) {
                                    result = _lodash2.default.assignIn({ data: datas }, _retMsg2.default.getErrorNotice('SUCCESS'));
                                } else {
                                    result = _lodash2.default.assignIn({ data: [] }, _retMsg2.default.getErrorNotice('SUCCESS'));
                                }
                                ctx.body = result;case 9:case 'end':return _context2.stop();}}}, _callee2, _this2);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}();

    };

    this.uploadSource = function () {var _this3 = this;
        return function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {var uploadService, file, source, upload;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:

                                uploadService = new _services.AliUpload();
                                file = ctx.request.files[0];
                                source = ctx.query.source;_context3.next = 5;return (
                                    uploadService.uploadfile(file, source));case 5:upload = _context3.sent;
                                ctx.body = _lodash2.default.assignIn({ path: upload.Location || "" }, _retMsg2.default.getErrorNotice('SUCCESS'));case 7:case 'end':return _context3.stop();}}}, _callee3, _this3);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}();

    };
};exports.default =

SourceController;
//# sourceMappingURL=source.js.map