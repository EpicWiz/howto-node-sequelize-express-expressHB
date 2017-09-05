const db = require('../models/index.js'); //Requires sequelize and everything we need to query our db (see ../../model-index-wNotes.js)

module.exports = function(app) { //exports all of the routes on this page - they are imported to server.js and invoked by passing express server into them. (see ../server.js line 22)

  app.get('/', function(request, response) { //this is the route for your home page, or what is initially displayed/what action is performed when the site is visited by a user
    db.Animal.findAll({
      include: [db.Food]  //for a better explanation about include than I can give, check out https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566
    })
    .then((data) => { //actions to perform after query is completed
      let hbsObject = {
        animal: data
      };
      response.render('index', hbsObject); //loads your index.handlebars page and displays it to the user
    }).catch((error) => { //if there was an error, print it to the console
      console.log(error);
    });
  });

  app.get('/anotherPage', function(request, response) {
    response.render('anotherPage');
  });

};
