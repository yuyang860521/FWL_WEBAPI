'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _baseDAO2 = require('./baseDAO');var _baseDAO3 = _interopRequireDefault(_baseDAO2);
var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Get = function (_baseDAO) {(0, _inherits3.default)(Get, _baseDAO);
    function Get() {(0, _classCallCheck3.default)(this, Get);return (0, _possibleConstructorReturn3.default)(this, (Get.__proto__ || (0, _getPrototypeOf2.default)(Get)).call(this));

    }

    /* 按条件查询数据 */(0, _createClass3.default)(Get, [{ key: 'find', value: function find(
        params) {var
            conditions = params.conditions,columns = params.columns,options = params.options,sort = params.sort,currentPage = params.currentPage,pageSize = params.pageSize,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            var exeObj = Model.find(conditions, columns, options);
            if (currentPage && pageSize) {
                exeObj.skip((currentPage - 1) * pageSize).limit(pageSize);
            }
            if (sort) {
                exeObj.sort(sort);
            }
            return exeObj.exec();
        }

        /* 按ID查询单条数据 */ }, { key: 'findById', value: function findById(
        params) {var
            id = params.id,columns = params.columns,options = params.options,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            var exeObj = Model.findById(id, columns, options);
            return exeObj.exec();
        }

        /* 按条件查询单条数据 */ }, { key: 'findOne', value: function findOne(
        params) {var
            conditions = params.conditions,columns = params.columns,options = params.options,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            var exeObj = Model.findOne(conditions, columns, options);
            return exeObj.exec();
        }

        /* 按条件查询最后一条数据 */ }, { key: 'findLastOne', value: function findLastOne(
        params) {var
            conditions = params.conditions,columns = params.columns,options = params.options,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            var exeObj = Model.find(conditions, columns, options).sort({ _id: -1 }).skip(0).limit(1);
            return exeObj.exec();
        }

        /* 按传入条件统计数据条数 */ }, { key: 'totalCount', value: function totalCount(
        params) {var
            conditions = params.conditions,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            var exeObj = Model.count(conditions);
            return exeObj.exec();
        }

        /* 去重复 */ }, { key: 'distinct', value: function distinct(
        params) {var
            conditions = params.conditions,field = params.field,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            return Model.distinct(field, conditions).exec();
        }

        /* 按传入数据和配置进行关联操作 */ }, { key: 'populated', value: function populated(
        params) {var
            datas = params.datas,options = params.options,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            return Model.populate(datas, options);
        }

        /* 复杂操作，分组聚合计算等处理 */ }, { key: 'aggregate', value: function aggregate(
        params) {var
            conditions = params.conditions,columns = params.columns,groupConditions = params.groupConditions,currentPage = params.currentPage,pageSize = params.pageSize,sort = params.sort,modelName = params.modelName;
            var Model = this.getDBEngine(modelName);
            var exeObj = Model.aggregate().append({ $project: columns }).match(conditions);

            if (groupConditions) {
                exeObj.group(groupConditions);
            }
            if (sort) {
                exeObj.sort(sort);
            }
            if (currentPage && pageSize) {
                exeObj.skip((currentPage - 1) * pageSize).limit(pageSize);
            }
            return exeObj.exec();
        } }]);return Get;}(_baseDAO3.default);exports.default = Get;
//# sourceMappingURL=get.js.map