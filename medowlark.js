const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./library/handlers')

const app = express()

// Configure Handlebars view engin
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main', 
}))
app.set('view engine', 'handlebars')

const port = process.env.port || 3000

// Declare static middleware
app.use(express.static(__dirname + '/public'))

// Routes / Handlers

app.get('/', handlers.home)

app.get('/', handlers.about)

// Custom 404 page
app.get('/', handlers.notFound)

// Custom 500 page
app.get('/', handlers.serverError)

if(require.main === module) {
    app.listen(port, () => {
        console.log( `Express started on http://localhost:${port}` + 
            '; press Ctrl-C to terminate' )
        })
    } else {
      module.exports = app
    }