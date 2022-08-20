
import bcrypt from 'bcryptjs'
import _ from 'lodash'

const handleCheckPermission = (comparativeData,encryptedData) => {
    let result = bcrypt.compareSync(comparativeData,encryptedData)
    return result
}

const resetDefaultState = (objectData) => {
    if(!_.isEmpty(objectData)){
        for(let key in objectData ){
            objectData[key] = ''
        }
        return objectData
    }
}

export default {
    handleCheckPermission,
    resetDefaultState
} 