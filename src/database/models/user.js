const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define("User",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, { timestamps: false }); // coloquei esse timestamps pq tava dando um problema q achei a soluçãoa qui..https://stackoverflow.com/questions/20386402/sequelize-unknown-column-createdat-in-field-list

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, //definindo a associação hasMany da tabela users com a blogpost
      { foreignKey: 'userId', as: 'blogposts'}) 
  }

  return UserTable;
};


module.exports = UserSchema;