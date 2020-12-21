import Express from 'express'
import { IUserEntity } from '../entities/UserEntity'
import IUser from '../models/IUser'
import logService from '../services/log.service'
import userService from '../services/user.service'

class UserController {
  async download (req: Express.Request, res: Express.Response): Promise<Express.Response<IUser[]>> {
    try {
      const users = await userService.download()
      return res.json(users)
    } catch (e : Error | any) {
      logService.writeError(req, res, e.message)
      return res.status(500).send('Houve um erro, por favor tenta novamente mais tarde')
    }
  }

  async save (req: Express.Request, res: Express.Response): Promise<Express.Response<IUserEntity[]>> {
    try {
      const users = await userService.save()
      return res.json(users)
    } catch (e: Error | any) {
      console.log(e)
      logService.writeError(req, res, e.message)
      return res.status(500).send('Houve um erro, por favor tenta novamente mais tarde')
    }
  }
}

export default new UserController()
