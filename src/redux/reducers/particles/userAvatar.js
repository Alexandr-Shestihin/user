import {UPLOAD_AVATAR} from '../../types'


const rd = (state=null, action) => {
    switch(action.type) {
        case UPLOAD_AVATAR: 
            return state = action.payload
        default:
            return state
    }
}

export default rd