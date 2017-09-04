const express = require('express'); //makes the functionality of express available
const bodyParser = require('body-parser'); //makes middleware that parses request bodies available
const methOver = require('method-override'); //allows us to explicitly use PUT and DELETE in database queries in our routes
const expHbars = require('express-handlebars'); //mustaches functionality is available
const db = require('./models'); //MODELS where your database tables are defined

const app = express(); //initializes our express server
const PORT = process.env.PORT || 8080; //database port defined...either

//ALL app.use listed are set to define instances/cases where that middleware will be utilized
//express static - where you get your static files (css, js, img, etc...)
app.use(express.static('./assets'));

//bodyParser - parsing requests
app.use(bodyParser.json()); //for normal json requests
app.use(bodyParser.urlencoded({ extended: false })); //parses url encoded body types
app.use(bodyParser.text()); //parses text
app.use(bodyParser.json({ type: 'application/vnd.api+json'})); //parses json api requests http://jsonapi.org/

//method override for put/delete
//in your form actions you will define it similarly as follows depending on your cases
//action="/handlebarRoute?_method=PUT" method="POST" (alternatively, PUT = update rows, DELETE = delete rows)
app.use(methOver('_method'));

//exp-handlebars
//Default Layout will be automatically searched for in './views/layouts' and we have defined the fole to be called main.handlebars
app.engine('handlebars', expHbars({ defaultLayout: 'main' }));
//define your view engine as handlebars
app.set('view engine', 'handlebars');

//controllers
//html-routes is an explicit way to route to your different web pages
require('./controllers/html-routes.js')(app);
//api-routes is an explicit way to submit forms, perform api calls for data, etc.
require('./controllers/api-routes.js')(app);

//When the app is run, sequelize will sync the models as they are defined into the database
//"{force: true}" will delete the tables (if they exist) before redefining them (this will remove any data stored in these tables)
//app.listen
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() { //makes the site available on the defined port ie: localhost:PORT
    console.log('Listening on port: ' + PORT);
  });
});
