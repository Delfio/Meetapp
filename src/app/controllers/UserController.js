
//Função para validar dados de entrada!
import * as Yup from 'yup';

import User from '../models/User';

class UserController{
  //Cadastro de usúario!
  async store(req, res){

    //Metodo para definir padronização de campos
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      avatar_id: Yup.number().required()
    });

    //Caso não esteja padronizado
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro de validação!'})
    }

    // buscando se o usúario existe
    const UserExists = await User.findOne({
      where:{
        email: req.body.email
      }
    });

    //Caso exista - email já cadastrado
    if(UserExists){
      return res.status(400).json({error: 'Email Já está em uso parceiro'})
    }

    // Caso o email não esteja em uso
    const {id, name, email, avatar_id} = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id
    });
  }

  //atualizando user
  async update(req, res){

    //Padronização dos campos
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      //Colocando a verificação dentro da padronização
      confirmPassowrd: Yup.string().when('password', (password, field)=>
        password? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    //caso a padronização não dê certo
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Favor insira a senha corretamente'})
    }


    //Caso de certo busque isso da requisição
    const { email, oldPassword } = req.body;
    
    //busque o usúario que tenha um id igual
    const user = await User.findByPk(req.userId);

    //Se o email da requisição for diferente do email do user do banco
    if(email !== user.email){
      const UserExists = await User.findOne({ where:{ email } });

      //Caso o email para cadastro já esteja em uso
      if(UserExists){
        return res.status(400).json({error: 'Email Já está em uso parceiro'})
      }
    }

    //Verificação de senha
    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({error: "Senha Invalida para alteração!"})
    }

    //Se der tudo certo att
    const {id, name} = await user.update(req.body)

    return res.json({
      id,
      name,
      email
    })
  }
}
export default new UserController();