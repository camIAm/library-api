
require('dotenv').config()

const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const dbName = process.env.COUCH_DATABASE
const dbURL = process.env.COUCH_URL

console.log('db is' + dbURL + dbName)

const db = new PouchDB(dbURL + dbName)

////////////
// Book
////////////

const deleteBook = id => remove(id)
const updateBook = doc => update(doc)

/////////////
// Author
///////////
const getAuthor = id => get(id)
const createAuthor = body => {
  body._id = pkGen('author_','_',body.author.name)
  return add(body)
}


////////////
// helpers
///////////
const get = id => db.get(id)
const add = doc => db.put(doc)
const remove = id => db.get(id).then(data => db.remove(data))
const update = doc => db.put(doc)

module.exports = {
  deleteBook,
  updateBook,
  createAuthor,
  getAuthor
}
