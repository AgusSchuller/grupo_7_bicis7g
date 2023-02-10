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
    },
    lastName: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    },
    image: {
      type: dataTypes.STRING,
    },
    role: {
      type: dataTypes.INTEGER,
    },
  }; /*
  let config = {
    tableName: "",
    timeStamps: false,
  };*/
  const User = sequelize.define(alias, cols);

  return User;
};
