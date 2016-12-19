'use strict';



var _app = require('../app');var _app2 = _interopRequireDefault(_app);
var _http = require('http');var _http2 = _interopRequireDefault(_http);
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _config = require('config');var _config2 = _interopRequireDefault(_config);
var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
var _models = require('../models');var models = _interopRequireWildcard(_models);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                * 项目启动入口文件
                                                                                                                                                                                                                                                                                                                                                                                                                                                */var server = _http2.default.createServer(_app2.default.callback());var port = process.env.PORT || _config2.default.get("port");

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      设置node环境变量：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          windows下命令：set NODE_ENV = [development or production]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          linux下命令：export NODE_ENV = [development or production]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
console.log("current NODE_ENV is：%s", process.env.NODE_ENV);

var connect = function connect() {
    _mongoose2.default.connect(_config2.default.get("mongodb.url"), _config2.default.get("mongodb.options"));
};
connect();
_mongoose2.default.connection.on('connected', function () {return console.log('database is connect successfull');});
_mongoose2.default.connection.on('error', function (err) {return console.log('database is connect failed：%s', err);});
_mongoose2.default.connection.on('disconnected', connect);
_mongoose2.default.set('debug', _config2.default.get("mongodb.debug")); // 生产上关闭数据库脚本调试
var model = void 0,key = void 0;
for (key in models) {
    model = _lodash2.default.lowerFirst(key);
    _mongoose2.default.model(model, models[key], 't_' + model);

}

server.listen(port);
server.on('error', function (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.log(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            console.log(error);
            throw error;}

});
server.on('listening', function () {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on %s', bind);
});
//# sourceMappingURL=www.js.map