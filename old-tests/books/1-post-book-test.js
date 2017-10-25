const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop } = require('ramda')

/* RESPONSE - 201 and Sample Response will be SIMILAR TO THIS...
{
  "ok": true,
  "id": "mydoc",
  "rev": "1-A6157A5EA545C99B00FF904EEF05FD9F"
}
*/

test('POST /books', t => {
  const bookWereAdding = {
    title: 'A Bugs Life',
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

  request(app)
    .post('/books')
    .send(bookWereAdding)
    .expect(201)
    .expect(('Content-Type', 'json'))
    .end((err, res) => {
      const addedBook = res.body // see above
      const status = res.statusCode //201
      const bookID = addedBook.id // 'book_bugs_life'
      const bookOK = addedBook.ok // true
      t.plan(3)
      t.equals(status, 201, 'Status Code 201?')
      t.equals(bookOK, true, 'ok is true?')
      t.equals(bookID, 'book_bugs_life', 'book ID ok?')
      t.end()
    })
})
