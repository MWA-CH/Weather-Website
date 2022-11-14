const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Muhammed Waqar Ahmed'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Muhammed Waqar Ahmed'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For guide and help please contact m.waqar.ahmed@gmail.com',
        title: 'Help',
        name: 'Muhammed Waqar Ahmed'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error })

            //console.log(location)
            //console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                Address: req.query.address
            })
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muhammed Waqar Ahmed',
        errorMessage: 'Help article not found.'

    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muhammed Waqar Ahmed',
        errorMessage: 'Page nor found.'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})