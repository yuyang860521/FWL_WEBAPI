import _ from 'lodash'
import retMsg from '../../common/retMsg'
import {User} from '../../services'

let UserController = function() {
    if(!(this instanceof UserController)) {
        return new UserController()
    }

    this.saveUser = function() {
        return async (ctx, next) => {
            let {name, phone, address} = ctx.request.body

            const currTime = new Date().getTime()
            let params = {
                data: {
                    name: name,
                    phone: phone,
                    address: address,
                    created: currTime,
                    modified: currTime
                }
            }

            const userService = new User()
            await userService.saveUser(params)
            ctx.body = retMsg.getErrorNotice('SUCCESS')
        }
    }
}

export default UserController