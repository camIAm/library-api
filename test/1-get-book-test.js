const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const { omit, compose, prop } = require('ramda')

test('GET /books/:id', t => {
  request(app)
    .get('/books/book_brave_new_world')
    .expect(200)
    .expect('Content-Type', 'json')
    .end((err, res) => {
      const compareBook = {
  _id: "book_brave_new_world",
  title: "A brave new world",
  type: "book",
  author: "author_aldous_huxley",
  publisher: "Penguin Books",
  ISBN: "1293478753",
  pages: 574,
  genre: "Fiction",
  description: "Brave New World is a novel written in 1931 by A Huxley, and published in 1932. Set in London in the year AD 2540 (632 A.F.—'After Ford'—in the book), the novel anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that are combined to make a profound change in society. Huxley followed this book with a reassessment in an essay, Brave New World Revisited (1958), and with Island (1962), his final novel.",
  Rating: "78",
  prices: [
    {
      type: "paperback",
      price: 9.99
    },
    {
      type: "hardback",
      price: 19.99
    },
    {
      type: "audio",
      price: 19.99
    },
    {
      type: "kindle",
      price: 12.99
    }
  ]
}
      const retrievedBookFromDB = compose(omit('_rev'), prop('body'))(res)
      t.same(compareBook, retrievedBookFromDB, 'Compare book')
      t.equals(prop('statusCode', res), 200, 'Status code 200?')
      t.end()
    })
})
