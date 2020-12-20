import IUser from '../models/User'
import DbService from './db.service'
import axios from 'axios'
import UserEntity, { IUserEntity } from '../entities/UserEntity'
import { Equal } from 'typeorm'

class UserService {
  async download (): Promise<IUser[]> {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
  }

  private sortUser (users: IUserEntity[]): IUserEntity[] {
    return users.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1

      return 0
    })
  }

  private userToUserEntity (user: IUser): IUserEntity {
    return {
      apiId: user.id,
      name: user.name,
      username: user.username,
      address: {
        city: user.address.city,
        street: user.address.street,
        zipcode: user.address.zipcode,
        suite: user.address.suite,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng
      },
      contact: {
        email: user.email,
        phone: user.phone,
        website: user.website
      }
    }
  }

  private async saveUser (user: UserEntity): Promise<UserEntity> {
    const dbService = await DbService.getConnection()
    const userSaved = await dbService.getRepository(UserEntity).create(user)
    const userExist = await dbService.getRepository(UserEntity).find({ where: { apiId: Equal(user.apiId) } })
    console.log(userExist)
    if (userExist.length === 0) await dbService.getRepository(UserEntity).save(userSaved)

    return user
  }

  async save (): Promise<UserEntity[]> {
    const data = await this.download()
    const users = data.map(this.userToUserEntity)
    const sortUser = this.sortUser(users)
    const entitySaved = await Promise.all(sortUser.map(this.saveUser))

    return entitySaved
  }
}

export default new UserService()
