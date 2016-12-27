import _ from 'lodash'
import retMsg from '../../common/retMsg'
import ObjectId from 'mongoose/lib/types/objectid'
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
            type = parseInt(type)
            column = parseInt(column)

            const currTime = new Date().getTime()
            let arr = pathstr.split(",")
            for(let i=0; i<arr.length; i++) {
                if(arr[i]) {
                    arr[i] = {name: name, url: arr[i], column: column, type: type, description: desc, status: (type == 2 ? 2 : 1), created: currTime, modified: currTime}
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

    /**
     * 资源列表 get
     * URL /api/source/list
     * params:
     *          column
     *          type
     *          start 
     *          limit
                from
     * 说明：
     *      column 图片所属栏目
     *      type 资源类型： 1图片， 2视频
     *      start 起始页数
     *      limit 每页多少条
     *      from 标识是web还是dashboard访问
     *
     * return JSONArray
     */
    this.sourceList = function() {
        return async (ctx, next) => {
            let {type, column, start, limit, from} = ctx.query
            type = parseInt(type)

            let params = {
                conditions: {
                    type: type,
                    status: {
                        $ne: 0
                    }
                },
                columns: {
                    _id:1,
                    name:1,
                    column:1,
                    url:1,
                    description:1,
                    status: 1,
                    modified:1
                }, 
                currentPage: start,
                pageSize: limit,
                sort: {
                    modified: -1
                }
            }

            if(column) {
                params.conditions.column = parseInt(column)
            }

            if(from == 'web') {
                params.conditions.status = 1
            }

            if(type == 2) {
                params.sort = {
                    status: 1,
                    modified: -1
                }
            }

            const sourceService = new Source()

            let result
            let datas = await sourceService.sourceList(params)
            if(_.isArray(datas) && datas.length > 0) {
                const total = await sourceService.totalCount(params)

                result = _.assignIn({data:datas, total:total}, retMsg.getErrorNotice('SUCCESS'))
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

    this.delSource = function() {
        return async (ctx, next) => {
            let {idarr} = ctx.request.body

            let arr = []
            for(let id of idarr) {
                if(id) {
                    arr.push(ObjectId(id))
                }
            }

            let params = {
                conditions: {
                    _id: {$in: arr}
                },
                updates: {
                    status: 0
                }
            }

            const sourceService = new Source()
            await sourceService.delSource(params)
            ctx.body = retMsg.getErrorNotice('SUCCESS')
        }
    }

    this.sourceGet = function() {
        return async (ctx, next) => {
            let {id} = ctx.query

            let params = {
                id: id,
                columns: {
                    _id:1,
                    name:1,
                    column:1,
                    url:1,
                    description:1,
                    created:1
                }
            }
            const sourceService = new Source()

            let result
            let data = await sourceService.getSource(params)
            if(data) {
                result = _.assignIn({data:data}, retMsg.getErrorNotice('SUCCESS'))
            } else {
                result = _.assignIn({data:{}}, retMsg.getErrorNotice('SUCCESS'))
            }
            ctx.body = result
        }
    }

    this.sourceUpdate = function() {
        return async (ctx, next) => {
            let {id, name, desc, column} = ctx.request.body

            let params = {
                conditions: {
                    _id: ObjectId(id)
                },
                updates: {
                    name: name,
                    description: desc,
                    modified: new Date().getTime()
                }
            }

            if(column) {
                params.updates.column = parseInt(column)
            }

            const sourceService = new Source()
            await sourceService.updateSource(params)
            ctx.body = retMsg.getErrorNotice('SUCCESS')
        }
    }

    this.sourceOnOff = function() {
        return async (ctx, next) => {
            let {id, status} = ctx.request.body
            status = parseInt(status)

            const sourceService = new Source()

            if(status == 1) { // 如果是上架操作，先把所有视频下架，因为只能有一个视频处于上架状态
                let paramsOffAll = {
                    conditions: {
                        type: 2,
                        status: 1
                    },
                    updates: {
                        status: 2
                    }
                }
                await sourceService.updateSource(paramsOffAll)
            }

            let params = {
                id: id,
                updates: {
                    status: status
                }
            }

            await sourceService.sourceOnOff(params)

            ctx.body = retMsg.getErrorNotice('SUCCESS')
        }
    }
}

export default SourceController