'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _retMsg = require('../../common/retMsg');var _retMsg2 = _interopRequireDefault(_retMsg);
var _services = require('../../services');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var UserController = function UserController() {
    if (!(this instanceof UserController)) {
        return new UserController();
    }

    this.saveUser = function () {var _this = this;
        return function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {var _ctx$request$body, name, phone, address, currTime, params, userService;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_ctx$request$body =
                                ctx.request.body, name = _ctx$request$body.name, phone = _ctx$request$body.phone, address = _ctx$request$body.address;

                                currTime = new Date().getTime();
                                params = {
                                    data: {
                                        name: name,
                                        phone: phone,
                                        address: address,
                                        created: currTime,
                                        modified: currTime } };



                                userService = new _services.User();_context.next = 6;return (
                                    userService.saveUser(params));case 6:
                                ctx.body = _retMsg2.default.getErrorNotice('SUCCESS');case 7:case 'end':return _context.stop();}}}, _callee, _this);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();

    };
};exports.default =

UserController;
//# sourceMappingURL=user.js.map