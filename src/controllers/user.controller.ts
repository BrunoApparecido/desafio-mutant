import Express from 'express'
import { IUserEntity } from '../entities/UserEntity'
import IUser from '../models/IUser'
import logService, { LogType } from '../services/log.service'
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
    } catch (e: Error | any) {
      logService.writeLog(LogType.Error, e.message)
      return res.json([])
    }
  }
}

export default new UserController()
