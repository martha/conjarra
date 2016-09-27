'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

const pg = require('pg')
//pg.defaults.ssl = true;
const conString = process.env.DATABASE_URL || 
  'postgres://marthakedwards:@localhost/verbos' // TODO ??

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Error handler. Must be last function added with app.use
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Oh noes')
})

app.get('/', (request, response) => {
  response.render('index.html')
})

app.post('/verificar', function(req, res, next) {

  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }

    var persona = String('form_' + req.body.persona);
    var verbo = req.body.verbo;

    var queryString = 'SELECT infinitive, mood, tense, ' + persona + ' ' +  //TODO
      'FROM verbs WHERE infinitive = $1'

    client.query(queryString, [verbo], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      var respuestas = {};
      var equivocaciones = {};

      var len = result.rows.length;
      for (var i = 0; i < len; i++) {
        var row = result.rows[i];
        var mood = row.mood.toLowerCase().replace(/ /g, "_");
        var tense = row.tense.toLowerCase().replace(/ /g, "_");
        var correctAnswer = row[persona];
        var key = mood + '_' + tense;
        respuestas[key] = correctAnswer;
      }

      delete req.body.verbo;
      delete req.body.persona;
      var keys = Object.keys(req.body);
      len = keys.length;

      for (i = 0; i < len; i++) {
        var key = keys[i];
        var submittedAnswer = req.body[key];
        var correctAnswer = respuestas[key];
        if (submittedAnswer != correctAnswer) {
          equivocaciones[key] = correctAnswer;
        }
      }

      res.json(equivocaciones)
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
