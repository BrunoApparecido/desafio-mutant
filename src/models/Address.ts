import Geo from './Geo'

interface Address {
    street : String,
    suite : String,
    city : String,
    zipcode : String,
    geo : Geo
}

export default Address
