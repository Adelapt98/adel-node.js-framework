const config = require('config')
const {
  Pool
} = require('pg')
const config = {
  host: config.get('PGHOST'),
  user: config.get('PGUSER'),
  password: config.get('PGPASSWORD'),
  database: config.get('PGDATABASE'),
  port: config.get('PGPORT')
}
const pool = new Pool(config)
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

exports.insertOrUpdate = (query) => {
  return pool.query(query + ' RETURNING *;')
    .then((result) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.executeQuery = (query) => {
  return pool.query(query)
    .then((result) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
