module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: dataTypes.STRING,
    },
  }/*
  let config = {
    tableName: "",
    timeStamps: false,
  };*/
  const User = sequelize.define(alias, cols);

  //luego de define asociar con otras tablas:
  // user.associate = function (models){
  //user.belongsToMany(models.user, {
    //as: "users",
    //trough: "users",
    //foreingKey: "users_id",
    //timestamps: false, 
    //otherKey: "",
  //})
  //}

  return User;
};
