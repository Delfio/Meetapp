import Sequelize, { Model } from 'sequelize';

class User extends Model{
  /**
   * Variavel 'sequelize' de conexão com o banco
   * Que será usada nas config do database, para distribuir os models
   * Database/Index.js
   */
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING
    },{
      sequelize,
    });
  }
}

export default User;