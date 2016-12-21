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
     *          name
     *          column
     *          desc
     *          pathstr 
     *          type
     *
     *
     * 说明：
     *      name 资源标题
     *      column 图片所属栏目
     *      type 资源类型： 1图片， 2视频
     *      pathstr 图片在阿里云的路径字符串，多张图以逗号分隔
     *      desc 图片描述
     *
     * return {errcode:xxx, errmsg:xxx}
     */
    this.saveSource = function() {
        return async (ctx, next) => {
            let {name, column, desc, pathstr, type} = ctx.request.body

            const currTime = new Date().getTime()
            let arr = pathstr.split(",")
            for(let i=0; i<arr.length; i++) {
                if(arr[i]) {
                    arr[i] = {name: name, url: arr[i], column: parseInt(column), type: parseInt(type), description: desc, created: currTime, modified: currTime}
                }
            }
            
            let params = {
                dataArr: arr
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
            let source = ctx.query.source
            let upload = await uploadService.uploadfile(file, source)
            ctx.body = _.assignIn({path: upload.Location||""}, retMsg.getErrorNotice('SUCCESS'))
        }
    }
}

export default SourceController