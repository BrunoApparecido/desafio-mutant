import Geo from './Geo'

interface IAddress {
    street : String,
    suite : String,
    city : String,
    zipcode : String,
    geo : Geo
}

export default IAddress
