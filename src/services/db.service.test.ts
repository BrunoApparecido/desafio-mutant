import dbService from './db.service';

beforeAll(async ()=>{
  await dbService.getConnection();
});

afterAll(async ()=>{
  await dbService.close();
});

beforeEach(async () => {
  await dbService.clear();
});

it('Connect DB, should retun connection object', () => {
  const connection = dbService.getConnection()
  //expect(connection).is
})
