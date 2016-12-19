export default (function() {
    let conf = {
        error: {
            MSG_SUCCESS: {
                errcode: 0,
                errmsg: '操作成功'
            },
            MSG_ERROR: {
                errcode: -1,
                errmsg: '操作失败'
            }
        }
    }

    return {
        getErrorNotice: function(name) {
            return conf['error']['MSG_'+name] ? conf['error']['MSG_'+name] : null
        }
    }
})()