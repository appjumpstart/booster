const { join } = require('path')

const execa = require('execa')
const Knex = require('knex')
const config = require('./fixtures/knexfile')

const booster = '../../index.js'
const cwd = join(__dirname, 'fixtures')

async function assertDbSeeded (knex) {
  const { rows } = await knex.raw('SELECT * FROM categories')
  expect(rows[0].name).toBe('Personal')
  expect(rows[1].name).toBe('Business')
}

test('booster migrates and seeds the default database', async () => {
  const knex = Knex(config.test)
  try {
    const { stdout } = await execa(booster, { cwd })
    expect(stdout).toMatchSnapshot()
    await assertDbSeeded(knex)
  } finally {
    await knex.destroy()
  }
})

test('booster migrates and seeds the specified database', async () => {
  const knex = Knex(config.development)
  try {
    const { stdout } = await execa(booster, ['development'], { cwd })
    expect(stdout).toMatchSnapshot()
    await assertDbSeeded(knex)
  } finally {
    await knex.destroy()
  }
})

test('booster migrates and seeds using the specified knexfile', async () => {
  const knex = Knex(config.test)
  try {
    const { stdout } = await execa(booster, ['-c', cwd], { cwd })
    expect(stdout).toMatchSnapshot()
    await assertDbSeeded(knex)
  } finally {
    await knex.destroy()
  }
})

test('booster outputs error when specified knexfile not found', async () => {
  const cmd = execa(booster, ['-c', '/tmp'], { cwd })
  await expect(cmd).rejects.toThrowErrorMatchingSnapshot()
})
