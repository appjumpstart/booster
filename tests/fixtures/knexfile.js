const database = 'booster'
const user = 'postgres'
const password = process.env.CI ? '' : 'williemayshayes'

const development = { client: 'pg', connection: { database, user, password } }
const connection = { database: `${database}_test`, user, password }

module.exports = { development, test: { ...development, connection } }
