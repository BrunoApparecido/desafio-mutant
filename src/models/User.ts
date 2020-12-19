
import Address from './Address'
import Company from './Company'

interface User {
    id : Number,
    name: String,
    username: String,
    email : String,
    address : Address,
    phone : String,
    website : String
    company : Company
}

export default User
