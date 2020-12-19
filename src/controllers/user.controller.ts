import Express from 'express'
import User from '../models/User'
import userService from '../services/user.service'

class UserController {
  async download (req: Express.Request, res: Express.Response): Promise<Express.Response<User[]>> {
    try {
      const users = await userService.download()
      return res.json(users)
    } catch (e) {
      return res.json([])
    }
  }
}

export default new UserController()
