#!/usr/bin/env node

const path = require('path')
const meow = require('meow')
const { green, red } = require('chalk')
const Knex = require('knex')

async function run ({ input, flags }) {
  // Determine knexfile path.
  const filepath = flags.config && flags.config.includes('.js')
    ? path.resolve(flags.config)
    : path.resolve(flags.config || '.', 'knexfile.js')

  try {
    // Load Knex configuration from knexfile.js.
    const knexfile = require(filepath)

    // Extract configuration based on current environment.
    const config = knexfile[input[0] || process.env.NODE_ENV || 'development']
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

    if (exists && flags.drop) {
      // If the database exists, drop it.
      await knex.raw(`DROP DATABASE ${database};`)
      console.log(green(`\n  ✅ Database ${database} dropped! \n`))
      return 0
    } else if (flags.drop) {
      console.error(red(`\n  🚫 Database ${database} doesn't exist!`))
      return 1
    } else if (!exists) {
      // Create the database if it doesn't exist.
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
    console.log(green(`\n  🌱 Database seeded! \n`))

    // Exit successfully.
    return 0
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error(red(`\n  🚫 Could not find knexfile.js at ${filepath}`))
    } else {
      console.error(err)
    }
    return 1
  }
}

const cli = meow(`
  Usage
    booster <environment?>

  Options
    --help, -h    Output (this) help
    --config, -c  Specify the knexfile path (defaults to <root>/knexfile.js)
    --drop, -d    Drop the database

  Example
    ❯ npx booster

    👟 Migrations run!

    🌱 Database seeded!

`, {
  flags: {
    help: { type: 'boolean', alias: 'h' },
    config: { type: 'string', alias: 'c' },
    drop: { type: 'boolean', alias: 'd' }
  }
})

if (cli.flags.help) {
  cli.showHelp()
} else {
  run(cli).then(code => process.exit(code))
}
