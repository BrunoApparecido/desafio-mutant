import express from 'express'
import userController from './controllers/user.controller'

const routes = express.Router()

routes.get('/users/download', userController.download)
routes.get('/users/save', userController.save)

export default routes
