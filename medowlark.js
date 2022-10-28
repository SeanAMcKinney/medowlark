const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./library/fortune')
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

// Routes
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`))

    app.get('/', (req, res) => res.render('home'))

    app.get('/about', (req, res) => {
        res.render('about', { fortune: fortune.getFortune() } )
    })

// Custom 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

// Custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.get('/', handlers.home)

app.get('/', handlers.about)

// Custom 404 page
app.get('/', handlers.notFound)

// Custom 500 page
app.get('/', handlers.serverError)