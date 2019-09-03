import User from '../models/User';

class UserController{
  //Cadastro de usúario!
  async store(req, res){
    const UserExists = await User.findOne({
      where:{
        email: req.body.email
      }
    });
    if(UserExists){
      return res.status(400).json({error: 'Email Já está em uso parceiro'})
    }

    const {id, name, email} = await User.create(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  async update(req, res){
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if(email !== user.email){
      const UserExists = await User.findOne({ where:{ email } });

      if(UserExists){
        return res.status(400).json({error: 'Email Já está em uso parceiro'})
      }
    }

    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({error: "Senha Invalida para alteração!"})
    }

    const {id, name} = await user.update(req.body)

    return res.json({
      id,
      name,
      email
    })
  }
}
export default new UserController();