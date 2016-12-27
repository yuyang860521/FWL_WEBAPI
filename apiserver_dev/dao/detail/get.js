import baseDAO from './baseDAO'
import _ from 'lodash'

export default class Get extends baseDAO {
    constructor() {
        super()
    }

    /* 按条件查询数据 */
    find(params) {
        let {conditions, columns, options, sort, currentPage, pageSize, modelName} = params;
        let Model = this.getDBEngine(modelName);
        let exeObj = Model.find(conditions, columns, options);
        if(currentPage && pageSize) {
            currentPage = parseInt(currentPage)
            pageSize = parseInt(pageSize)
            exeObj.skip((currentPage - 1) * pageSize).limit(pageSize);
        }
        if (sort) {
            exeObj.sort(sort);
        }
        return exeObj.exec();
    }

    /* 按ID查询单条数据 */
    findById(params) {
        let {id, columns, options, modelName} = params;
        let Model = this.getDBEngine(modelName);
        let exeObj = Model.findById(id, columns, options);
        return exeObj.exec();
    }

    /* 按条件查询单条数据 */
    findOne(params) {
        let {conditions, columns, options, modelName} = params;
        let Model = this.getDBEngine(modelName);
        let exeObj = Model.findOne(conditions, columns, options);
        return exeObj.exec();
    }

    /* 按条件查询最后一条数据 */
    findLastOne(params) {
        let {conditions, columns, options, modelName} = params;
        let Model = this.getDBEngine(modelName);
        let exeObj = Model.find(conditions, columns, options).sort({_id:-1}).skip(0).limit(1);
        return exeObj.exec();
    }

    /* 按传入条件统计数据条数 */
    totalCount(params) {
        let {conditions, modelName} = params;
        let Model = this.getDBEngine(modelName);
        let exeObj = Model.count(conditions);
        return exeObj.exec();
    }

    /* 去重复 */
    distinct(params) {
        let {conditions, field, modelName} = params;
        let Model = this.getDBEngine(modelName);
        return Model.distinct(field, conditions).exec();
    }

    /* 按传入数据和配置进行关联操作 */
    populated(params) {
        let {datas, options, modelName} = params;
        let Model = this.getDBEngine(modelName);
        return Model.populate(datas, options);
    }

    /* 复杂操作，分组聚合计算等处理 */
    aggregate(params) {
        let {conditions, columns, groupConditions, currentPage, pageSize, sort, modelName} = params;
        let Model = this.getDBEngine(modelName);
        let exeObj = Model.aggregate().append({$project: columns}).match(conditions)

        if(groupConditions) {
            exeObj.group(groupConditions);
        }
        if(sort) {
            exeObj.sort(sort)
        }
        if(currentPage && pageSize) {
            exeObj.skip((currentPage - 1) * pageSize).limit(pageSize)
        }
        return exeObj.exec()
    }
}