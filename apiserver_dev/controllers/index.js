import User from './detail/user'
import Source from './detail/source'

let ControllerFactory = function(type) {
    if(this instanceof ControllerFactory) {
        return new this[type]
    } else {
        return new ControllerFactory(type)
    }
}

ControllerFactory.prototype = {
    Source: function() {
        return new Source()
    },
    User: function() {
        return new User()
    }
}

export default ControllerFactory