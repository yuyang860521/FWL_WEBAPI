'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _koa = require('koa');var _koa2 = _interopRequireDefault(_koa);


var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _url = require('url');var _url2 = _interopRequireDefault(_url);
var _config = require('config');var _config2 = _interopRequireDefault(_config);
var _koaConvert = require('koa-convert');var _koaConvert2 = _interopRequireDefault(_koaConvert);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _koaGenericSession = require('koa-generic-session');var _koaGenericSession2 = _interopRequireDefault(_koaGenericSession);
var _koaGenericSessionMongo = require('koa-generic-session-mongo');var _koaGenericSessionMongo2 = _interopRequireDefault(_koaGenericSessionMongo);

















var _koaCors = require('koa-cors');var _koaCors2 = _interopRequireDefault(_koaCors);







var _koaCharset = require('koa-charset');var _koaCharset2 = _interopRequireDefault(_koaCharset);






var _koaBodyparser = require('koa-bodyparser');var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);



















var _koaErrorhandler = require('koa-errorhandler');var _koaErrorhandler2 = _interopRequireDefault(_koaErrorhandler);




var _api = require('./routers/api');var _api2 = _interopRequireDefault(_api);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var app = new _koa2.default(); // koa session
app.keys = ['test', 'api']; // 若不加此方法，则存储session报错
app.use((0, _koaConvert2.default)((0, _koaGenericSession2.default)({ prefix: "test:yy:", rolling: true, store: new _koaGenericSessionMongo2.default(_config2.default.get("mongodb")), cookie: { maxAge: 3600000 * 24, httpOnly: true, signed: true } }))); //koa 跨域
app.use((0, _koaConvert2.default)((0, _koaCors2.default)({ credentials: true, // set Access-Control-Allow-Credentials to true
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] }))); // koa字符集
app.use((0, _koaConvert2.default)((0, _koaCharset2.default)({ charset: 'utf8' }))); // koa HTTP参数解析
app.use((0, _koaBodyparser2.default)({ jsonLimit: '2mb' }));app.use(function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {var start, ms, fdate;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:start = new Date();_context.next = 3;return next();case 3:ms = new Date() - start;fdate = (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss');console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + ' - ' + fdate);case 6:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());app.on("error", function (err, ctx) {console.log(err, 'app something error =>');}); // koa 错误处理
app.use((0, _koaConvert2.default)((0, _koaErrorhandler2.default)())); // 应用路由
app.use(_api2.default.routes(), _api2.default.allowedMethods());exports.default = app;
//# sourceMappingURL=app.js.map