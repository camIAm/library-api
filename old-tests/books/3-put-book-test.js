const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop } = require('ramda')

test('PUT /books/:id', t => {
  request(app)
    .get('/books/book_bugs_life')
    .then(getRes => {
      const responseBody = prop('body', getRes)
      responseBody.author = 'Darth Vader'
      return request(app)
        .put('/books/book_bugs_life')
        .send(responseBody)
    })
    .then(putRes => {
      t.plan(5)
      t.equals(200, putRes.statusCode, 'PUT status code 200?')
      t.equals('book_bugs_life', putRes.body.id, 'PUT id ok?')
      return request(app).get('/books/book_bugs_life')
    })
    .then(getResult => {
      t.equals(getResult.statusCode, 200, 'GET status code 200?')
      t.equals(getResult.body._id, 'book_bugs_life', 'GET id ok?')
      t.equals(getResult.body.author, 'Darth Vader', 'GET is Darth Vader?')
      t.end()
    })
    .catch(err => console.log(err))
})
