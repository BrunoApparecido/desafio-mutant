import fs from 'fs'
import elasticsearch from 'elasticsearch'
import ILog from '../models/ILog'

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

  private async writeElastic (type: LogType, message: ILog) {
    try {
      this.elasticSearch.index({
        index: 'logs',
        body: {
          ...message,
          logType: type === LogType.Info ? 'info' : 'error'
        }
      })
    }
    catch (e) {
      this.writeConsole(LogType.Error, e)
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
      this.writeConsole(LogType.Error, e)
    }
  }

  private writeConsole (type: LogType, logMessage: ILog) {
    const message = this.stringLog(logMessage)
    if (type === LogType.Error) console.error('ERROR: ' + message)
    else console.log(message)
  }

  async writeLog (type: LogType, message: ILog) {
    this.writeConsole(type, message)
    await this.writeTextFile(type, message)
    await this.writeElastic(type, message)
  }
}

export default new LogService()
