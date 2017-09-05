const db = require('../models/index.js'); //see html-routes.js for more info

module.exports = function(app) {

//I've exaggerated the indentation in an attempt to make it more readable.
//Try not to nest more than 2-3 queries in this way or it will be very difficult to read
//For both you and others.
  app.post('/api/addNew', function(request, response) {
        db.Animal.create({ //create the new animal
          name: request.body.name.trim(),
          animal: request.body.animal.trim()
        })
      .then((data) => {
                db.Animal.findAll({ //find the last animal created
                  where: {
                    name: request.body.name.trim(),
                    animal: request.body.animal.trim()
                  },
                  order: [
                    ['id', 'DESC']
                  ],
                  limit: 1
                })
                .then((data) => {
                          db.Food.create({ //create the animal food for the created animal
                            food: request.body.animal + ' Food',
                            AnimalId: data[0].id
                          }).then((error) => {
                            response.redirect('/');
                          }).catch((error) => {
                            console.log(error);
                          });
                })
                .catch((error) => {
                  console.log(error);
              });
      })
      .catch((error) => {
        console.log(error);
      });
  });

//NOTE: Try not to nest too many db queries in one request. More than 2-3 will start making it hard to read.
// The example below is already starting to look like a mess as you can see. You can either try using a promise,
// or just redirect to a separate route to continue.
//I've exaggerated the indentation to attempt making it more readable.
  app.put('/api/change', function(request, response) {
    db.Animal.update({ //First update the animal table
      name: request.body.name2.trim(),
      animal: request.body.animal2.trim()
      }, {
        where: {
          id: request.body.updateId
        }
    }).then((data) => {

          db.Food.update({ //then update the food table (food the animal eats)
            food: request.body.animal2.trim() + ' Food'
          }, {
            where: {
              AnimalId: request.body.updateId
            }
          }).then((data) => { //then return to the main page (this will refresh the display with updated table data)
            response.redirect('/');
          }).catch((error) => {
            console.log(error);
          });

    }).catch((error) => {
      console.log(error);
    });
  });

  app.delete('/api/delete/:id', function(request, response) {
    Promise.all([
      db.Animal.destroy({
        where: {
          id: request.params.id
        }
      }),
      db.Food.destroy({
        where: {
          AnimalId: request.params.id
        }
      })
    ])
    .then((data) => {
                              // A possible out of scope basic explanation of Promise use.
                              // IF YOU WANTED TO ACCESS THE RETURN DATA FOLLOWING A DB QUERY USING A Promise.all([]) request
                              // REMEMBER THAT DATA IS NOW AN ARRAY. data[0] IS THE DATA FROM db.Animal.destroy, and data[1]
                              // IS THE DATA FROM db.Food.destroy, and so on depending on your case. IF YOU WANTED TO RETURN DATA FROM A PROMISE LIKE THAT SHOWN
                              // ABOVE THROUGH AN EXPRESS-HANDLEBARS PAGE RENDER, USE THE FOLLOWING FORMAT.
                              // let hbsObject = {
                              //    animals: data[0],
                              //    food: data[1]
                              // };
                              //  response.render('hbPage', hbsObject);
                              // animals and food data will then be available on your page.
      response.redirect('/');
    }).catch((error) => {
      console.log( error);
    });
  });

};
