'use strict'

const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/templates'));

// Error handler. Must be last function added with app.use
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Oh noes')
})

app.get('/', (request, response) => {
  response.render('index.html')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Error: ', err)
  }

  console.log(`server listening on ${port}`)
})
