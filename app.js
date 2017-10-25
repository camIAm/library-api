require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const checkRequiredFields = require('./lib/checkRequiredFields.js')
const {deleteBook,updateBook,createAuthor,getAuthor} = require('./dal')
const {prop, isEmpty, join, not, path, compose, merge, omit, __} = require('ramda')
app.use(bodyParser.json())


app.put('/books/:id' ,(req,res,next) => {
  if(isEmpty(prop('body', req))) {
    return next(new HTTPError(400, 'Missing Request Body'))
  }
  const missingFields = checkRequiredFields(['_id','_rev','type','title', 'author', 'ISBN', 'genre', 'description'], prop('body',req))
  if (not(isEmpty(missingFields))) {
    return next(new HTTPError(400, `Missing Required Fields: ${join(', ', missingFields)}`))
  }
  updateBook(prop('body',req))
  .then(updatedResult => res.status(200).send(updatedResult))
  .catch(err => next(new HTTPError(err.status, err.message)))
})

app.delete('/books/:id', (req,res,next)=>{
  deleteBook(path(['params','id'],req))
  .then(response => res.status(200).send(response))
  .catch(err => next(new HTTPError(err.status, err.message)))
})

app.get('/authors/:id',(req,res,next)=>{
  getAuthor(path(['params','id'],req))
  .then(doc => res.status(200).send(doc))
  .cath(err=> next(new HTTPError(err.status,err.message)))
})

app.post('/authors',(req,res,next)=>{
  if(isEmpty(prop('body',req))){
    next(new HTTPError(400,"request body not given"))
  }
  const body = compose(
      omit(['_id','_rev']),
      merge(__,{type:'author'}),
      prop('body')
      )(req)

  const missingFields = checkRequiredFields(['name','placeOfBirth','birthDate'],body)
  if(not(isEmpty(missingFields))){
    return next(new HTTPError(400,`missing required fields: ${join(' ',missingFields)}`))
  }

  addAuthor(body)
  .then(result => res.status(201).send(result))
  .catch(err => next(new HTTPError(err.status, err.message)))
})

app.use((err, req, res, next) => {console.log(prop('message', req),' ', prop('path', req), 'error', err)
res.status(prop('status', err) || 500).send(err)
})

app.listen(port, () => {
  console.log('API is up on port' + port)
})

module.exports = app
