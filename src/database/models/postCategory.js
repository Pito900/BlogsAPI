const PostCategorySchema = (sequelize, DataTypes) => {
    const PostCategoryTable = sequelize.define('PostCategory',
    {
        postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true }
    },
    { timestamps: false }
  );    
  PostCategoryTable.associate = (models) => { // desta forma fazemos a associação de N:N
        models.Category.belongsToMany(models.BlogPost, { 
        as: 'blogpost',
        foreignKey: 'categoryId',
        through: PostCategoryTable,
        otherKey: 'postId',
        }) 
        
        models.BlogPost.belongsToMany(models.Category, { 
        as: 'categories',
        foreignKey: 'postId',
        through: PostCategoryTable,
        otherKey: 'categoryId',
        }) 
}
  
    return PostCategoryTable;
  };
  
  module.exports = PostCategorySchema;