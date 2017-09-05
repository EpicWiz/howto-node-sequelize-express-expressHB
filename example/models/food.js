module.exports = function(sequelize, DataTypes) { // this module is imported into ./index.js where sequelize and DataTypes are passed into this function. See ../../model-index-wNotes.js for more info.
  var Food = sequelize.define("Food", {
    // food cannot be null
    food: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Food.associate = function(models) {
    Food.belongsTo(models.Animal);
  };

  return Food;
};

//For more information about Sequelize models, check out the docs at
//http://docs.sequelizejs.com/
//
//There you can learn even more complex things about Associations and how to customize
//your model to your needs.
