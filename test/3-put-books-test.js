const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const { omit, compose, prop } = require('ramda')

test('PUT /books/:id/',t=>{
  const edittedBook={
  "_id": "book_bugs_life",
  "title": "A Bugs Life",
  "author": "author_aldous_huxley_new",
  "type": "book",
  "publisher": "The Penguin Books Co.",
  "ISBN": "12947333",
  "pages": 354,
  "genre": "Biography",
  "description": "blahNew",
  "rating": 94,
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
  .get('/books/book_bugs_life')
  .then(res=>{
    const responseBody = prop('body',res)
    responseBody.author = "new Author"
    return request(app).put('/books/book_bugs_life').send(responseBody)
  }).then(putRes =>{
        t.equals(200,putRes.statusCode,"status code PUT")
        t.equals("book_bugs_life",putRes.body.id,"id is the same")
        return request(app).get('/books/book_bugs_life')
    }).
    then(getRes =>{
        t.plan(5)
        t.equals(getRes.statusCode,200,"status code Get?")
        t.equals(getRes.body._id,'book_bugs_life',"id is the same")
        t.equals(getRes.body.author,'new Author',"GET darth Vader")
        t.end()
    }).catch(err=>console.log(err))
})
