import Meetups from '../models/Meetapp';
import User from '../models/User';
import * as Yup from 'yup';

class MeetappController {
  async store(req, res) {
    //Metodo para definir padronização de campos
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      descricao: Yup.string().required(),
      localizacao: Yup.string().required(),
      date: Yup.date().required(), //  "2019-10-01T18:00:00(timezone ex:)-03:00"
      banner_id: Yup.number().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Arquivos invalidos' })
    }

    const {name, descricao, localizacao, date, banner_id} = req.body;
    console.log(userId);
    // Checar se o user_id existe
    const isUser = await User.findOne({
      where:{ id: req.userId }
    });

    if(!(isUser)){
      return res.status(401).json({error: 'Sessão expirada logue novamente'})
    }

    const meetappExists = await Meetups.findOne({ where: {name: req.body.name} });
    if(meetappExists){
      return res.status(500).json({ error: 'Evento já cadastrado' });
   }

   const meetappCreate = await Meetups.create({
     user_id: req.userId, // O user_id é do usuario logado
     name,
     descricao,
     localizacao,
     date,
     banner_id
   });

   return res.json(meetappCreate);

  };
}

export default new MeetappController();