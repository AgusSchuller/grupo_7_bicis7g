module.exports = (sequelize, dataTypes) => {
  let alias = "Model";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    }
  };
  /*
    let config = {
      tableName: "products",
      timeStamps: false,
    };*/
  const Model = sequelize.define(alias, cols);
  Model.associate = function (models) {
    Model.belongsTo(models.Product, {
      as: "product",
      foreignKey:'id',
      sourceKey: 'modelId',
    });
  };
  return Model;
};
