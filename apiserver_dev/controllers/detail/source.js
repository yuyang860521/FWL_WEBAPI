import _ from 'lodash'
import retMsg from '../../common/retMsg'
import {Source, AliUpload} from '../../services'
import fs from 'fs'
import path from 'path'

let SourceController = function() {
    if(!(this instanceof SourceController)) {
        return new SourceController()
    }

    /**
     * 保存上传资源信息 post
     * URL /api/source/save
     * params:
     *          list
     *
     * list的值举例：
     *
     *      [
     *          {name:'图片标题1', type:1, url:'http://xxxxxxx', description:'这里是图片描述1'},
                {name:'图片标题2', type:1, url:'http://yyyyyyy', description:'这里是图片描述2'}
     *      ]
     *
     * 说明：
     *      name 资源标题
     *      type 资源类型： 1图片， 2视频
     *      url 图片在阿里云的路径
     *      description 图片描述
     *
     * return {errcode:xxx, errmsg:xxx}
     */
    this.saveSource = function() {
        return async (ctx, next) => {
            let {list} = ctx.request.body

            const currTime = new Date().getTime()
            for(let obj of list) {
                _.assignIn(obj, {type: parseInt(obj.type), created: currTime, modified: currTime})
            }
            
            let params = {
                dataArr: list
            }

            const sourceService = new Source()
            await sourceService.saveSource(params)
            ctx.body = retMsg.getErrorNotice('SUCCESS')
        }
    }

    this.sourceList = function() {
        return async (ctx, next) => {
            let {type, start, limit} = ctx.query

            let params = {
                conditions: {
                    type: parseInt(type)
                },
                columns: {
                    _id:1,
                    url:1
                }, 
                start: parseInt(start),
                limit: parseInt(limit),
                sort: {
                    modified: -1
                }
            }
            const sourceService = new Source()

            let result
            let datas = await sourceService.sourceList(params)
            if(_.isArray(datas) && datas.length > 0) {
                result = _.assignIn({data:datas}, retMsg.getErrorNotice('SUCCESS'))
            } else {
                result = _.assignIn({data:[]}, retMsg.getErrorNotice('SUCCESS'))
            }
            ctx.body = result
        }
    }

    this.uploadSource = function() {
        return async (ctx, next) => {

            const uploadService = new AliUpload()
            let file = ctx.request.files[0]
            let upload = await uploadService.uploadfile(file)
            ctx.body = _.assignIn({path: upload.Location||""}, retMsg.getErrorNotice('SUCCESS'))
        }
    }
}

export default SourceController