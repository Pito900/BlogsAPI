const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define("BlogPost",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.NUMBER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, { timestamps: false });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, //Essa tabela possui uma ForeignKey que pegamos do model User, colocamos essa na nossa tabela como
      { foreignKey: 'userId', as: 'user'}) //userId e vamos chamar ele de users.
  }

  return BlogPostTable;
};

module.exports = BlogPostSchema;