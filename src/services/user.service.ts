import User from "../models/User";

import axios from 'axios'

class UserService {
  async download (): Promise<User[]> {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
  }

  save () {
  }
}

export default new UserService()
