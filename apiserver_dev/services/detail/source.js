import * as dao from '../../dao'
import _ from 'lodash'

export default class Source {
    constructor() {
		this.module = {modelName: 'source'}
    }

    saveSource(params) {
    	_.assignIn(params, this.module)
        return new dao.Save().batchSave(params)
    }

	sourceList(params) {
        _.assignIn(params, this.module)
        return new dao.Get().find(params)
    }

    totalCount(params) {
        _.assignIn(params, this.module)
        return new dao.Get().totalCount(params)
    }

    delSource(params) {
        _.assignIn(params, this.module)
        return new dao.Update().update(params)
    }

    getSource(params) {
        _.assignIn(params, this.module)
        return new dao.Get().findById(params)
    }

    updateSource(params) {
        _.assignIn(params, this.module)
        return new dao.Update().update(params)
    }

    sourceOnOff(params) {
        _.assignIn(params, this.module)
        return new dao.Update().updateById(params)
    }
}