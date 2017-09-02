'use strict';

var fs        = require('fs'); //allows access to file system
var path      = require('path'); //provides utilities for working with file and directory paths
var Sequelize = require('sequelize'); //ORM and handles database connection
//path.basename() {returns last portion of a path as a string}
//ie: 'usr/file/anotherfile/index.html' returns 'index.html'
//module.filename {module=node's module object, filename = fully resolved filename to the module}
// module.filename = (something like)
// /Users/username/Desktop/08-ORM-To-Sequelize-Solved/models/index.js
//basename = 'index.js' -->later it will exclude this file from being added to db in a condition
var basename  = path.basename(module.filename); //^
var env       = process.env.NODE_ENV || 'development'; //environment (ie:heroku) provides data,
// or our config.json does
//__dirname = directory name of the current module (equivalent to path.dirname(__filename))
//__dirname is combined with the path to our config,json file, and either the 'development' object
// is used or the data is supplied by the environment (ie:heroku)
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {}; //the exported models object that will be filled with models from all files
//in ./models folder (excluding index.js as mentioned above)

if (config.use_env_variable) { //if the environment (ie: heroku) provides config info
  //if database, username, password, and config info comes from environment (ie: heroku)
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  //gets database name, username, password, and config info from ./config/config.json
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs //access file system
  .readdirSync(__dirname) //inside this folder
  .filter(function(file) { //filter files by using following function
    //return files that don't start with a '.', and also don't have the same name as this file,
    //and also DO end in '.js'
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) { //for each of the qualified files we just returned
    //'import' is a function on the sequelize constructor that takes a path and imports a model
    //defined in another file
    //here we are joining the path to this directory (__dirname) with the current instance of
    //file (remember this is a loop)
    //so we are running a function that takes each valid filename and returns a model import
    //from that file
    var model = sequelize['import'](path.join(__dirname, file));
    //adding the model imports to the db object which will contain all the export models we need
    //for our app
    db[model.name] = model;
  });
  //taking all the keys from the db object (names of each model), we loop through them to see
  //if the models contain a key called 'associate'
  //The associations are what allows us to relate the different tables to one another, and allows
  // us to query them with joins later
Object.keys(db).forEach(function(modelName) { //^
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; //db object now includes our constructor
db.Sequelize = Sequelize; //db object now includes the require for sequelize

module.exports = db; //export the goods so we now only reference db for everything
