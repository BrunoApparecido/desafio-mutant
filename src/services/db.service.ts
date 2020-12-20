import { createConnection, Connection } from 'typeorm'

class DbService {
  private _connection?: Connection

  async getConnection (): Promise<Connection> {
    if (!this._connection) this._connection = await createConnection(process.env.CONNECTION_TYPE || 'mysql')
    return this._connection
  }

  public async close () {
    (await this.getConnection()).close()
    this._connection = undefined
  }

  async clear () {
    const connection = await this.getConnection()
    const entities = connection.entityMetadatas

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  }
}

export default new DbService()
