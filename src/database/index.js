/**
 * Arquivo para globalizar os models
 * Connetar com o banco de dados e carregar as models!
 */

import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetups from '../app/models/Meetapp';


import databaseConfig from '../config/database';

//Arrays com todos os models
const models = [User, File, Meetups];

class Database{
  constructor(){ 
    this.init();
  }
  init(){
    //Variavel que está sendo esperada dentro dos models "super.init()"
    this.connection = new Sequelize(databaseConfig);
    //Percorrendo o model user e iniciando ele passando a conexão como parametro
    models
    .map(model => model.init(this.connection))//mapear as models e instanciar os campos do banco
    .map(model => model.associate && model.associate(this.connection.models));//mapear as models e instanciar os campos do banco
  }

}

export default new Database();