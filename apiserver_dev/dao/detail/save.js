import baseDAO from './baseDAO'

export default class Save extends baseDAO {
    constructor() {
        super()
    }

    save(params) {
        let {data, modelName} = params
        let Model = this.getDBEngine(modelName)
        return Model(data).save()
    }

    batchSave(params) {
    	let {dataArr, modelName} = params
        let Model = this.getDBEngine(modelName)
        return Model.create(dataArr)
    }
}