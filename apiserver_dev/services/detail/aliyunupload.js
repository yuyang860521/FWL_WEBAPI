import ALY from 'aliyun-sdk'
import config from 'config'
import aous from 'aliyun-oss-upload-stream'
import promise from 'bluebird'
import path from 'path'
import fs from 'fs'

let ossStream = aous(new ALY.OSS({
  	accessKeyId: config.get('aliyun.accessKeyId'),
  	secretAccessKey: config.get('aliyun.secretAccessKey'),
  	endpoint: config.get('aliyun.endpoint'),
  	apiVersion: config.get('aliyun.apiVersion')
}))

export default class AliUpload {
    constructor() {
    }

    uploadfile(file, folder) {
      return new promise((resolve, reject) => {

        let upload = ossStream.upload({
            Bucket: config.get('aliyun.bucket.name'),
            Key: folder + "/" + new Date().getTime() + 1000+parseInt(Math.random()*9000) + path.extname(file.name)
        })
        upload.minPartSize(config.get('aliyun.minPartSize'))

        upload.on('uploaded', (details) => {
            resolve(details)
        })

        upload.on('error', (error) => {
            reject(error)
        })

        
        let read = fs.createReadStream(file.path)
        read.pipe(upload)
      })
    }
}