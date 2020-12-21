import express from 'express'
import 'reflect-metadata'
import routes from './routes'
import morgan from 'morgan'
import logService, { LogType } from './services/log.service'
import ILog from './models/ILog'

const app = express()
app.use(morgan(function (tokens, req, res) {
  const log: ILog = {
    datetime: tokens.date(req, res, 'iso'),
    method: tokens.method(req, res),
    endpoint: tokens.url(req, res),
    codeReturn: tokens.status(req, res),
    timeExec: tokens['response-time'](req, res, 'ms'),
    contentLength: tokens.res(req, res, 'content-length')
  }

  logService.writeLog(LogType.Info, log)

  return null
}))
app.use(express.json())
app.use(routes)

app.listen(3000)
