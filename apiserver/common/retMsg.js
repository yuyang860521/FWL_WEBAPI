'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = function () {
    var conf = {
        error: {
            MSG_SUCCESS: {
                errcode: 0,
                errmsg: '操作成功' },

            MSG_ERROR: {
                errcode: -1,
                errmsg: '操作失败' } } };




    return {
        getErrorNotice: function getErrorNotice(name) {
            return conf['error']['MSG_' + name] ? conf['error']['MSG_' + name] : null;
        } };

}();
//# sourceMappingURL=retMsg.js.map