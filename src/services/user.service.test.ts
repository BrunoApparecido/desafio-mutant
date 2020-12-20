import axios from 'axios'
import userService from './user.service'

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

describe('User Service', () => {
    it("api return success, should be return api data", async () => {
        const resp = {data : apiData}
        mockedAxios.get.mockResolvedValueOnce(resp)
        const result = await userService.download()
        expect(result).toBe(apiData)
    })

    it("Api error code return should be throw error", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("error"))
        await expect(userService.download()).rejects.toThrowError()
    })
})
