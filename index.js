'use strict'

const express = require('express')
const app = express()
const port = 3000

const pg = require('pg')
const conString = 'postgres://marthakedwards:@localhost/verbos' // TODO ??
var fullVerbResult;

pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err)
  }

  var queryString = 'SELECT * FROM verbs WHERE infinitive = ' + 
    '( SELECT infinitive FROM verbs ORDER BY RANDOM() LIMIT 1);'
  // TODO past participle + gerund
  // just be smarter w/ the sql query in general

  client.query(queryString, [], function(err, result) {
    done()

    if (err) {
      return console.error('error happened during query', err)
    }

    fullVerbResult = result;

    console.log(result)
    // process.exit(0)
  })
})

app.use(express.static(__dirname + '/templates'));

// Error handler. Must be last function added with app.use
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Oh noes')
})

app.get('/', (request, response) => {
  response.render('index.html', {verbs: fullVerbResult})
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Error: ', err)
  }

  console.log(`server listening on ${port}`)
})
