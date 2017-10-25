const pkGen = require('./lib/build-pk')
const { prop, assoc } = require('ramda')
const {
  getBookTransformer,
  postBookTransformer
} = require('./lib/dal-mysql-transformers')
const dalHelper =
  process.env.DAL === 'mysql-dal' ? 'dal-mysql-helper' : 'dal-helper'

const { add, get, update, deleteDoc,addMySqlBook } = require(`./lib/${dalHelper}`)

const addBook = book => {
  book._id = pkGen('book', '_', book.title)
  if (dalHelper === 'dal-mysql-helper'){
  return addMySqlBook(book, 'book', postBookTransformer)
  }else{
  return add(book)
  }
}

const getBook = id => get(id, 'vbookPrices', getBookTransformer)
const updateBook = book => update(book)
const deleteBook = id => {
if (dalHelper === 'dal-mysql-helper'){
  return deleteDoc(id,'book')
}else{
  return deleteDoc(id)
}
}
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
