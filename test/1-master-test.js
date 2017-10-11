const groupTestCrud = require('./lib/group-test-crud')
const getHomeTest = require('./lib/test-get-home')
//  groupTestCrud(testName, path, postRequestBody, pk)

const postRequestBody = {
  title: 'A Brave New World',
  author: 'author_aldous_huxley',
  type: 'book',
  publisher: 'Penguin Books',
  ISBN: '12947281',
  genre: 'Fiction',
  description:
    "Brave New World is a novel written in 1931 by Aldous Huxley, and published in 1932. Set in London in the year AD 2540 (632 A.F.—'After Ford'—in the book), the novel anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that are combined to make a profound change in society.",
  rating: 95,
  prices: [
    { type: 'paperback', price: 9.99 },
    { type: 'hardback', price: 19.99 },
    { type: 'audio', price: 19.99 },
    { type: 'kindle', price: 12.99 }
  ]
}

getHomeTest()
  .then(text =>
    groupTestCrud(
      'BOOKS CRUD TEST',
      '/books',
      postRequestBody,
      'book_brave_new_world'
    )
  )
  .then(body => console.log('Success', body))
  .catch(err => console.log('error', err))