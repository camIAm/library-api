const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop } = require('ramda')

/*
{
  "ok": true,
  "id": "mydoc",
  "rev": "2-9AF304BE281790604D1D8A4B0F4C9ADB"
}
*/

test('DELETE /books/:id', t => {
  request(app)
    .delete('/books/book_bugs_life')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const deletedBook = prop('body', res)
      const status = prop('statusCode', res)
      const ok = prop('ok', deletedBook)
      const id = prop('id', deletedBook)
      t.plan(4)
      t.error(err, 'No error')
      t.equals(status, 200, 'Status 200?')
      t.equals(ok, true, 'ok true?')
      t.equals(id, 'book_bugs_life', 'id ok?')
    })
})
