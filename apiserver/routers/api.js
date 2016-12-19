'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _controllers = require('../controllers');var _controllers2 = _interopRequireDefault(_controllers);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _koaBetterBody = require('koa-better-body');var _koaBetterBody2 = _interopRequireDefault(_koaBetterBody);
var _koaConvert = require('koa-convert');var _koaConvert2 = _interopRequireDefault(_koaConvert);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var router = (0, _koaRouter2.default)();

router.
post('/api/source/save', (0, _controllers2.default)('Source').saveSource()).
get('/api/source/list', (0, _controllers2.default)('Source').sourceList()).
post('/api/source/upload', (0, _koaConvert2.default)((0, _koaBetterBody2.default)()), (0, _controllers2.default)('Source').uploadSource()).

post('/api/user/save', (0, _controllers2.default)('User').saveUser());exports.default =

router;
//# sourceMappingURL=api.js.map