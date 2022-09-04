const express = require('express');
const express_handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const mysql = require('mysql2')

require('dotenv').config();

const app = express();
const port = process.env.port || 3001;

//parse middleware

app.use(bodyParser.urlencoded({ extended: false}));

//parse app/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//templating engine set up
// app.engine('handlebars', express_handlebars( {extname: '.handlebars' }));
app.set('view engine', 'handlebars');
app.engine('handlebars', express_handlebars.engine({
  defaultLayout: 'main',
  extname: '.handlebars'
}));

//router
app.get('', (req, res) => {
  res.render('home')
});


app.listen(port, () => console.log(`Listening on port ${port}`));