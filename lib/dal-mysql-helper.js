require('dotenv').config()
const NodeHTTPError = require('node-http-error')
const mysql = require('mysql')
const { isEmpty,map,prop,assoc } = require('ramda')

function createConnection() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })
}

//tap(x => console.log('after _id', x)),

// {
//   "title": "A Brave New World",
//   "author": "author_aldous_huxley",
//   "type": "book",
//   "publisher": "Penguin Books",
//   "ISBN": "12947281",
//   "genre": "Fiction",
//   "description": "Brave New World is a novel written in 1931 by Aldous Huxley, and published in 1932. Set in London in the year AD 2540 (632 A.F.—'After Ford'—in the book), the novel anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that are combined to make a profound change in society.",
//   "rating": 95,
//   "prices": [
//     {"type": "paperback", "price": 9.99},
//     {"type": "hardback", "price": 19.99},
//     {"type": "audio", "price": 19.99},
//     {"type": "kindle", "price": 12.99}
//   ]
// }

const add = (doc, tableName, transformer) => {
  // put the document into mysql database.  1) book 2) bookPrices
  return new Promise((resolve, reject) => {
    const connection = createConnection()
    connection.query(
      `INSERT INTO ${connection.escapeId(tableName)}
      SET ?`,
      transformer(doc),
      function(err, data) {
        if (err) {
          console.log('ERROR dal-mysql-helper.', err)
          return reject(err)
        }

        if (data) {
          connection.query(`INSERT INTO bookPrice `)
          return resolve(data)
        }
      }
    )
  })
}

// const addMySqlBook = (doc, tableName, transformer) => {
//   // put the document into mysql database.  1) book 2) bookPrices
//   return new Promise((resolve, reject) => {
//     const connection = createConnection()
//     connection.query(
//       `INSERT INTO ${connection.escapeId(tableName)}
//       SET ?`,
//       transformer(doc),
//       function(err, data) {
//         if (err) {
//           console.log('ERROR dal-mysql-helper.', err)
//           return reject(err)
//         }
//
//         if (data) {
//           connection.query(`INSERT INTO bookPrice (bookID, type, price)
//            VALUES ? `, [map(price =>[data.insertId, price.type, price.price],prop('prices',doc))],(err,data)=>{
//              console.log("err in nest: ",err)
//             if(err){
//               return reject(err)
//             }
//             if(data){
//               return resolve(data)
//             }
//           })
//           //return resolve(data)
//         }
//       }
//     )
//   })
// }
const addMySQLBook = (doc, tableName, transformer) => {
  // put the document into mysql database.  1) book 2) bookPrices
  return new Promise((resolve, reject) => {
    const connection = createConnection()
    connection.query(
      `INSERT INTO ${connection.escapeId(tableName)}
      SET ?`,
      transformer(doc),
      function(err, data) {
        if (err) {
          console.log('ERROR dal-mysql-helper.', err)
          return reject(err)
        }
        if (data) {
          //[[6,"paperback", 19.99],[6, "kindle", 9.99]]
          //map(price => assoc('bookID', data.insertId), doc.prices),
          const newlyCreatedBookID = data.insertId
          connection.query(
            `INSERT INTO bookPrice (bookID, type, price) VALUE ? `,
            [
              map(price => [data.insertId, price.type, price.price], doc.prices)
            ],
            function(err, data) {
              if (err) {
                console.log('ERROR dal-mysql-helper.', err)
                return reject(err)
              }
              if (data) {
                return resolve({ ok: true, id: newlyCreatedBookID })
              }
            }
          )
        }
      }
    )
  })
}

const get = (id, tableName, transformer) => {
  return new Promise((resolve, reject) => {
    const connection = createConnection()

    connection.query(
      `SELECT *
       FROM ${connection.escapeId(tableName)}
       WHERE ID = ?`,
      [id],
      function(err, data) {
        if (err) {
          return reject(err)
        }
        if (isEmpty(data)) {
          return reject(
            new NodeHTTPError(404, 'missing', {
              error: 'not_found',
              reason: 'missing',
              name: 'not_found',
              status: 404
            })
          )
        }

        if (data) {
          console.log('THE DATA IS length>>>', data, data.length)
          return resolve(transformer(data))
        }
      }
    )

    connection.end(function(err) {
      if (err) return err
    })
  })
}
const deleteDoc = (id, tableName) =>{
  return new Promise((resolve, reject) => {
    const connection = createConnection()
    connection.query(
      `DELETE
       FROM ${connection.escapeId(tableName)}
       WHERE ID = ?`,
      [id],
      function(err, data) {
        console.log('data ',data)

        if(err){
          console.log("err: ",err)
          reject(err)
        }
        if(isEmpty(data)){
          reject(new NodeHTTPError(404, "The ID of the book does not exist"))
        }
        if(data.affectedRows === 0){
          reject(new NodeHTTPError(404, "the book doesnt exist"))
        }
        if(data){
          resolve({ok:true,id,rev:null})
        }
      }
  )
})
}

module.exports = {
  add,
  deleteDoc,
  addMySQLBook,
  get
}
