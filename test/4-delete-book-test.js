const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const { omit, compose, prop } = require('ramda')

test('DELETE /books',t=>{
  const bookWereAdded={
  "_id": "book_bugs_life",
  "title": "A Bugs Life",
  "author": "author_aldous_huxley",
  "type": "book",
  "publisher": "Penguin Books",
  "ISBN": "12947283",
  "pages": 254,
  "genre": "Fiction",
  "description": "blah",
  "rating": 95,
  "prices": [
    {
      "type": "paperback",
      "price": 9.99
    },
    {
      "type": "hardback",
      "price": 19.99
    },
    {
      "type": "audio",
      "price": 19.99
    },
    {
      "type": "kindle",
      "price": 12.99
    }
  ]
}
request(app)
.delete('/books/book_bugs_life')
.expect(200)
.expect('Content-Type','json')
.end((err,res)=>{
  t.plan(3)
  const deleteBody = res.body
  const status = res.statusCode
  const bookId = deleteBody.id
  const bodyOk = deleteBody.ok
  t.equals(status,200,"delete status")
  t.equals(bookId, "book_bugs_life","id equal")
  t.equals(bodyOk, true, "body true")
})
})
