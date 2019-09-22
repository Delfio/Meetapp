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
      path: Sequelize.STRING,
    },{
      sequelize,
    });
    
    return this;
  }
}

export default File;