
import bcrypt from 'bcryptjs'


const handleCheckPermission = (comparativeData,encryptedData) => {
    let result = bcrypt.compareSync(comparativeData,encryptedData)
    return result
}

export default handleCheckPermission;