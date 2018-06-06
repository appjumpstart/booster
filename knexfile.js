require('dotenv').config()

const database = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASS

const development = { client: 'pg', connection: { database, user, password } }
const connection = { database: `${database}_test`, user, password }

module.exports = { development, test: { ...development, connection } }
