import Express from 'express'
import { IUserEntity } from '../entities/UserEntity'
import IUser from '../models/User'
import userService from '../services/user.service'

class UserController {
  async download (req: Express.Request, res: Express.Response): Promise<Express.Response<IUser[]>> {
    try {
      const users = await userService.download()
      return res.json(users)
    } catch (e) {
      return res.json([])
    }
  }

  async save (req: Express.Request, res: Express.Response): Promise<Express.Response<IUserEntity[]>> {
    try {
      const users = await userService.save()
      return res.json(users)
    } catch (e) {
      console.log(e)
      return res.json([])
    }
  }
}

export default new UserController()
