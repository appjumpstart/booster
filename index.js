const { resolve } = require('path')

const knexfile = require(resolve('./knexfile.js'))
const { green, red } = require('chalk')

async function setup () {
  try {
    const environment = process.env.NODE_ENV || 'development'
    const { client, connection } = knexfile[environment]

    let config = { client, connection: Object.assign({}, connection) }
    let knex
    let exists
    if (client === 'pg') {
      // Configure knex to connect to a system database and determine if the
      // environment's database exists.
      config.connection.database = 'postgres'
      knex = require('knex')(config)
      exists = await knex
        .first('datname')
        .from('pg_database')
        .where('datname', connection.database)
    } else if (client === 'mysql' || client === 'mariadb') {
      console.error(red('\n  🚫 MySQL/MariaDB support has not landed yet!'))
    } else {
      console.error(red('\n  🚫 Please open an issue or PR for your database!'))
    }

    // Create the database if it doesn't exist.
    if (!exists) {
      await knex.raw(`CREATE DATABASE ${connection.database};`)
      console.log(green(`\n  🚀 Database ${connection.database} created!`))
    }

    // Run migrations.
    await knex.migrate.latest()
    console.log(green(`\n  👟 Migrations run!`))

    // Seed the database.
    await knex.seed.run()
    console.log(green(`\n  🌱 Database seeded!`))

    // Exit successfully.
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

setup()
