//build an _id prop that takes the title of the book and does the following:
// such as   "title": "A Brave New World"
// transform it into "book_brave_new_world"
//  require ramda
//  lower case
//  strip off the the A or The if its the first word
//  concatenate the word "book_"
//  replace the spaces with underscores _

// prefix = "book"
// value = "A Brave New World"
// return value =>  "book_brave_new_world"

const {
  compose,
  toLower,
  split,
  join,
  concat,
  contains,
  head,
  drop
} = require('ramda')

const removeArticles = arrData =>
  contains(head(arrData), ['the', 'a']) ? drop(1, arrData) : arrData

module.exports = (prefix, joiner, value) =>
  compose(
    concat(prefix + joiner),
    join(joiner),
    removeArticles,
    split(' '),
    toLower()
  )(value)
