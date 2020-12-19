import axios from 'axios'
import request from 'supertest'
import express from 'express'
import userController from './controllers/user.controller'
import User from './models/User'
import routes from './routes'

const app = express();

app.use(routes)

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

const apiData =
    [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
            }
        }
    ]

describe('User Endpoints', () => {
    it('Request endpoint (user/download), should be return code 200 and data', async () => {
        const data : User[] = apiData
        mockedAxios.get.mockResolvedValueOnce({data : data})
        const res = await request(app).get('/users/download')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(data)
    })
    it('Request endpoint (user/download), but service return error, should be return code 200 and data empty', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("error"))
        const res = await request(app).get('/users/download')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual([])
    })


})  