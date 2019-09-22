import Sequelize, { Model } from 'sequelize';

class File extends Model{
  /**
   * Variavel 'sequelize' de conexão com o banco
   * Que será usada nas config do database, para distribuir os models
   * Database/Index.js
   */
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      descricao: Sequelize.STRING,
      date: Sequelize.STRING,
      canceled_at: Sequelize.DATE,

    },{
      sequelize,
    });
    
    return this;
  }
  static associate(models){
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' }),
    this.belongsTo(models.User, { foreignKey: 'banner_id', as: 'files' })
  };

}

export default File;