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
}