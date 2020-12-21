import fs from 'fs'
import elasticsearch from 'elasticsearch'
import ILog from '../models/ILog'
import express from 'express'

export enum LogType {
  // eslint-disable-next-line no-unused-vars
  Info,
  // eslint-disable-next-line no-unused-vars
  Error
}

class LogService {
  elasticSearch: elasticsearch.Client

  constructor () {
    const esHost = process.env.ELASTIC_SEARCH_HOST || 'http://localhost'
    this.elasticSearch = new elasticsearch.Client({
      host: esHost + ':9200'
    })
  }

  private async writeElastic (type: LogType, logMessage: ILog) {
    try {
      this.elasticSearch.index({
        index: 'logs',
        body: {
          ...logMessage,
          logType: type === LogType.Info ? 'info' : 'error'
        }
      })
    }
    catch (e) {
      logMessage.message = e
      this.writeTextFile(LogType.Error, logMessage)
      this.writeConsole(LogType.Error, logMessage)
    }
  }

  private stringLog (logMessage: ILog): String {
    const { codeReturn, contentLength, timeExec, message, endpoint, datetime, method } = logMessage
    return `${datetime || ''} - ${method || ''} - ${endpoint || ''} - ${contentLength || ''} - ${codeReturn || ''} - ${timeExec || ''} - ${message || ''}`
  }

  private async writeTextFile (type: LogType, logMessage: ILog) {
    try {
      const currentDate = new Date()
      const message = this.stringLog(logMessage)
      const dateFileName = currentDate.toLocaleDateString().replace(/\//gi, '-')
      fs.appendFileSync(`./logs/${dateFileName}.log`, message + '\r\n')
    } catch (e) {
      logMessage.message = e
      this.writeTextFile(LogType.Error, logMessage)
      this.writeConsole(LogType.Error, logMessage)
    }
  }

  private writeConsole (type: LogType, logMessage: ILog) {
    const message = this.stringLog(logMessage)
    if (type === LogType.Error) console.error('ERROR: ' + message)
    else console.log(message)
  }

  async writeError (req: express.Request, res: express.Response, message: string) {
    const currentDate = new Date()
    const date = currentDate.toISOString()
    const logMessage: ILog = {
      codeReturn: res.statusCode.toString(),
      contentLength: '0',
      datetime: date,
      endpoint: req.url,
      message: message,
      method: req.method
    }
    this.writeLog(LogType.Error, logMessage)
  }

  async writeInfo (message: ILog) {
    this.writeLog(LogType.Info, message)
  }

  async writeLog (type: LogType, message: ILog) {
    this.writeConsole(type, message)
    await this.writeTextFile(type, message)
    await this.writeElastic(type, message)
  }
}

export default new LogService()
