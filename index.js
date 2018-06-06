#!/usr/bin/env node

const { resolve } = require('path')

const { green, red } = require('chalk')
const Knex = require('knex')

const knexfile = require(resolve('./knexfile.js'))

async function setup () {
  try {
    const config = knexfile[process.env.NODE_ENV || 'development']
    const { database } = config.connection

    let knex
    let exists
    if (config.client === 'pg') {
      // Configure knex to connect to a system database and determine if the
      // environment's database exists.
      config.connection.database = 'postgres'
      knex = Knex(config)
      exists = await knex
        .first('datname')
        .from('pg_database')
        .where('datname', database)
    } else if (config.client === 'mysql' || config.client === 'mariadb') {
      console.error(red('\n  🚫 MySQL/MariaDB support has not landed yet!'))
    } else {
      console.error(red('\n  🚫 Please open an issue or PR for your database!'))
    }

    // Create the database if it doesn't exist.
    if (!exists) {
      await knex.raw(`CREATE DATABASE ${database};`)
      console.log(green(`\n  🚀 Database ${database} created!`))
    }

    // Connect to the existing or newly created database.
    config.connection.database = database
    knex = Knex(config)

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
