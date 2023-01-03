module.exports = (sequelize, dataTypes) => {
  let alias = "users";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING,
    },
    apellido: {
      type: dataTypes.STRING,
    },
    email: {
      // type:
    },
    password: {
      /// type:
    },
    imagen: {
      // type:
    },
  };
  let config = {
    tableName: "users",
    timeStamps: false,
  };
  const user = sequelize.define(alias, cols, config);

  return user;
};
