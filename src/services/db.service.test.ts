import { Connection } from 'typeorm';
import dbService from './db.service';

it('Connect DB, should retun connection object', async () => {
  const connection = await dbService.getConnection()
  expect(connection).toBeInstanceOf(Connection)
})
