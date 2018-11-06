exports.seed = async knex => {
  await knex('categories').del()
  return knex('categories').insert([{ name: 'Personal' }, { name: 'Business' }])
}
