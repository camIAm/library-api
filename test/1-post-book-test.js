const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const { omit, compose, prop } = require('ramda')

test('POST /books',t=>{
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
  .post('/books')
  .send(bookWereAdded)
  .expect(201)
  .expect('Content-Type','json')
  .end((err,res)=>{
    t.plan(3)
    const addedBook = res.body // see above
    const status = res.statusCode // 201
    const bookID = addedBook.id // book_bugs_lift
    const bookOK = addedBook.ok // true
    t.equals(status,201, "Status code")
    t.equals(bookOK,true,"ok is true?")
    t.equals(bookID,'book_bugs_life',"titles match")
  })
})
