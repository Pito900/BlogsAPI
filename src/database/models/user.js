const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define("User",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, //definindo a associação hasMany da tabela users com a blogpost
      { foreignKey: 'userId', as: 'blogposts'}) 
  }

  return UserTable;
};


module.exports = UserSchema;