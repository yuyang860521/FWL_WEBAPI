import baseDAO from './baseDAO'

export default class Update extends baseDAO {
    constructor() {
        super()
    }

    update(params) {
        let {conditions, updates, modelName} = params
        let Model = this.getDBEngine(modelName)
        return Model.update(conditions, updates, {multi: true})
    }

    updateById(params) {
        let {id, updates, modelName} = params
        let Model = this.getDBEngine(modelName)
        return Model.findByIdAndUpdate(id, updates)
    }
}