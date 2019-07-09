const host = process.env.CI ? 'db' : 'localhost'
const database = 'booster'
const user = 'postgres'
const password = 'williemayshayes'

const development = {
  client: 'pg',
  connection: { host, database, user, password }
}
const test = { ...development.connection, database: `${database}_test` }
const postgres = { ...test, database: 'postgres' }

module.exports = {
  development,
  test: { ...development, connection: test },
  postgres: { ...development, connection: postgres }
}
