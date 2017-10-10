require('dotenv').config()
const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const { prop, assoc } = require('ramda')
const { add, get, update, deleteDoc } = require('./lib/dal-helper')

const dbName =
  process.env.NODE_ENV === 'test'
    ? process.env.COUCH_DATABASE_TEST
    : process.env.COUCH_DATABASE

const dbURL =
  process.env.NODE_ENV === 'test'
    ? process.env.COUCH_URL_TEST
    : process.env.COUCH_URL

console.log('db is ' + dbURL + dbName)

const db = new PouchDB(dbURL + dbName)

const addBook = book => {
  book._id = pkGen('book', '_', book.title)
  return add(book)
}

const getBook = id => get(id)
const updateBook = book => update(book)
const deleteBook = id => deleteDoc(id)
const addAuthor = author =>
  add(assoc('_id', pkGen('author', '_', prop('name', author)), author))
const getAuthor = id => get(id)
const updateAuthor = author => update(author)
const deleteAuthor = id => deleteDoc(id)

const dal = {
  addBook,
  getBook,
  updateBook,
  deleteBook,
  addAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor
}
module.exports = dal
