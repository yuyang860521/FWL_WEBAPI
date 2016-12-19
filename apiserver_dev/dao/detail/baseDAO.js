import mongoose from 'mongoose'
import promise from 'bluebird'
import _ from 'lodash'
mongoose.Promise = promise

export default class BaseDAO {
    constructor() {
    }

    getDBEngine(modelName) {
        return mongoose.model(modelName);
    }
}