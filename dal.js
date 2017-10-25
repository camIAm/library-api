
require('dotenv').config()

const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const dbName = process.env.COUCH_DATABASE
const dbURL = process.env.COUCH_URL

console.log('db is' + dbURL + dbName)

const db = new PouchDB(dbURL + dbName)




const deleteBook = id => delete(id)
const updateBook = doc => update(doc)


////////////
// helpers
///////////

const delete = id => db.get(id).then(data => db.remove(data))
const update = doc => db.put(doc)

module.exports = {deleteBook}
