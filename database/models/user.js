module.exports = (sequelize, dataTypes) => {
  let alias = "users";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    apellido: {
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
    tableName: "users",
    timeStamps: false,
  };*/
  const user = sequelize.define(alias, cols);

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

  return user;
};
