require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const {deleteBook} = require('./dal')
app.use(bodyParser.json())

app.delete('/books/:id', (req,res,next)=>{
  deleteBook(path(['params','id'],req))
  .then(response => res.status(200).send(response))
  .catch(err => next(new HTTPError(err.status, err.message)))
})
