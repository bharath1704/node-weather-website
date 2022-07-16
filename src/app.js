const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join((__dirname, 'templates/views'));
const partialsPath = path.join((__dirname, 'templates/partials'));

// Setup  handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Thrinath'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page'
  })
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  forecast(44.1545, -75.7088, (error, data) => {
    if (error) {
    return res.send({ error });
    }
    res.send({
      city: data
    });
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search'
    });
  }
  res.send({
    products: []
  });
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help Page not Found',
    title: 'Weather App'
  })
});

app.get('*', (req, res) => {
  res.render('error', {
    message: 'Page not Found',
    title: 'Weather App'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})