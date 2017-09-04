const express = require('express');
const bodyParser = require('body-parser');
const methOver = require('method-override');
const expHbars = require('express-handlebars');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('./assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(methOver('_method'));

app.engine('handlebars', expHbars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./controllers/html-routes.js')(app);
require('./controllers/api-routes.js')(app);

db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
  });
});
