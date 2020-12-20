
import IAddress from './Address'
import ICompany from './Company'

interface IUser {
    id : Number,
    name: String,
    username: String,
    email : String,
    address : IAddress,
    phone : String,
    website : String
    company : ICompany
}

export default IUser
