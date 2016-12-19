import * as dao from '../../dao'
import _ from 'lodash'

export default class User {
    constructor() {
    	this.module = {modelName: 'user'}
    }

    saveUser(params) {
        _.assignIn(params, this.module)
        return new dao.Save().save(params)
    }
}