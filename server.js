'use strict'

const express = require('express')
const app = express()
const port = 3000

const pg = require('pg')
const conString = 'postgres://marthakedwards:@localhost/verbos' // TODO ??

app.use(express.static(__dirname));

// Error handler. Must be last function added with app.use
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Oh noes')
})

app.get('/', (request, response) => {
  response.render('index.html')
})

app.get('/nope', function (req, res, next) {  
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }

    var index = Math.floor(Math.random() * 6);
    var persons = ['1s', '2s', '3s', '1p', '2p', '3p']
    var person = persons[index]

    var queryString = 'SELECT infinitive, mood, tense, form_' + person + ' ' +
      'FROM verbs WHERE infinitive = ' + 
      '(SELECT infinitive FROM verbs ORDER BY RANDOM() LIMIT 1);'
    // TODO gerund ?

    client.query(queryString, [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.json(result.rows)
    })
  })
})

app.get('/random', function(req, res, next) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }

    var index = Math.floor(Math.random() * 6);
    var persons = ['1s', '2s', '3s', '1p', '2p', '3p']
    var person = persons[index]

    var queryString = 'SELECT infinitive FROM verbs ORDER BY RANDOM() LIMIT 1;'

    client.query(queryString, [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      var data = result.rows[0]
      data.persona = person

      res.json(data)
    })
  })
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Error: ', err)
  }

  console.log(`server listening on ${port}`)
})
