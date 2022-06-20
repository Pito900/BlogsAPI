const CategorySchema = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define("Categories",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  });
  return CategoryTable;
};

module.exports = CategorySchema;