const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// Configure Handlebars view engin
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main', 
}))
app.set('view engine', 'handlebars')

const port = process.env.port || 3000

//Fortunes
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Don't fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]

// Declare static middleware
app.use(express.static(__dirname + '/public'))

// Routes
app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`))

    app.get('/', (req, res) => res.render('home'))

    app.get('/about', (req, res) => {
        const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
        res.render('about', { fortune: randomFortune })
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

