const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { omit, compose, prop } = require('ramda')

test('GET /books/:id', t => {
  request(app)
    .get('/books/book_bugs_life')
    .expect(200)
    .expect('Content-Type', 'json')
    .end((err, res) => {
      const compareBook = {
        _id: 'book_bugs_life',
        title: 'A Bugs Life',
        type: 'book',
        author: 'author_aldous_huxley',
        publisher: 'Penguin Books',
        ISBN: '12947283',
        pages: 254,
        genre: 'Fiction',
        description: 'blah',
        rating: 95,
        prices: [
          {
            type: 'paperback',
            price: 9.99
          },
          {
            type: 'hardback',
            price: 19.99
          },
          {
            type: 'audio',
            price: 19.99
          },
          {
            type: 'kindle',
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
