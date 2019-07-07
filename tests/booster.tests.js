const { join } = require('path')
const { test } = require('@ianwalter/bff')
const execa = require('execa')
const Knex = require('knex')
const config = require('./fixtures/knexfile')

const booster = '../../index.js'
const cwd = join(__dirname, 'fixtures')

test('default database migration and seeding', async ({ expect }) => {
  const knex = Knex(config.development)
  try {
    const { stdout } = await execa(booster, { cwd })
    expect(stdout).toMatchSnapshot()
    const { rows } = await knex.raw('SELECT * FROM categories')
    expect(rows[0].name).toBe('Personal')
    expect(rows[1].name).toBe('Business')
  } finally {
    await knex.destroy()
  }
})

test('specified database migration and seeding', async ({ expect }) => {
  const knex = Knex(config.test)
  try {
    const { stdout } = await execa(booster, ['test'], { cwd })
    expect(stdout).toMatchSnapshot()
    const { rows } = await knex.raw('SELECT * FROM categories')
    expect(rows[0].name).toBe('Personal')
    expect(rows[1].name).toBe('Business')
  } finally {
    await knex.destroy()
  }
})

test('migration and seeding using specified knexfile', async ({ expect }) => {
  const knex = Knex(config.development)
  try {
    const { stdout } = await execa(booster, ['-c', cwd], { cwd })
    expect(stdout).toMatchSnapshot()
    const { rows } = await knex.raw('SELECT * FROM categories')
    expect(rows[0].name).toBe('Personal')
    expect(rows[1].name).toBe('Business')
  } finally {
    await knex.destroy()
  }
})

test('error thrown when specified knexfile not found', async ({ expect }) => {
  const cmd = execa(booster, ['-c', '/tmp'], { cwd })
  await expect(cmd).rejects.toThrowErrorMatchingSnapshot()
})
