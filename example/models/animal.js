module.exports = function(sequelize, DataTypes) { // this module is imported into ./index.js where sequelize and DataTypes are passed into this function. See ../../model-index-wNotes.js for more info.
  var Animal = sequelize.define("Animal", {
    // The name cannot be null, and must one of a kind in the table
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // The animal can be null, and if the user doesn't put anything the value is 'dog'
    animal: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'dog'
    }
  });

  Animal.associate = function(models) { 
    Animal.hasOne(models.Food);
  };

  return Animal;
};

//For more information about Sequelize models, check out the docs at
//http://docs.sequelizejs.com/
//
//There you can learn even more complex things about Associations and how to customize
//your model to your needs.
