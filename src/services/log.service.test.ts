import axios from 'axios'
import logService, { LogType } from './log.service'
import fs from 'fs'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Log Service', () => {
    it("Write log, should write log in console, file and elasticSearch", async () => {
      logService.writeLog(LogType.Info,{
        codeReturn: '200',
        contentLength: '1255',
        datetime: '2020-12-21',
        endpoint: '/user/save',
        message: '',
        method: 'POST',
        timeExec: '225ms'
      })

      fs.existsSync('./logs/')

    })
})
