
require('dotenv').config()

const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const dbName = process.env.COUCH_DATABASE
const dbURL = process.env.COUCH_URL

console.log('db is' + dbURL + dbName)

const db = new PouchDB(dbURL + dbName)




const deleteBook = id => delete(id)


//////////
// helpers
///////////

const delete = id => db.remove(id)

module.exports = {deleteBook}
