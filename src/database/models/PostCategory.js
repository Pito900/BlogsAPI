const PostCategorySchema = (sequelize, DataTypes) => {
    const PostCategoryTable = sequelize.define('PostCategory',
    {},
  );    
    PostCategorySchema.associate = (models) => {
        PostCategorySchema.belongsToMany(models.BlogPost, { 
        foreignKey: 'categoryId',
        as: 'blogposts',
        otherKey: 'postId',
        }) 
    PostCategorySchema.associate = (models) => {
        PostCategorySchema.belongsToMany(models.Category, { 
        foreignKey: 'postId',
        as: 'categories',
        otherKey: 'categoryId',
        }) 
    }
}
  
    return PostCategoryTable;
  };
  
  module.exports = PostCategorySchema;