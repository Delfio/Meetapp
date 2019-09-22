import Meetups from '../models/Meetapp';
import * as Yup from 'yup';

class MeetappController {
  async store(req, res) {
    //Metodo para definir padronização de campos
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      descricao: Yup.string().required(),
      localizacao: Yup.string().required(),
      date: Yup.date().required(),
      user_id: Yup.number().required(),
      banner_id: Yup.number().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Arquivos invalidos' })
    }

    const meetappExists = await Meetups.findOne({ where: {name: req.body.name} });
    if(meetappExists){
      return res.status(500).json({ error: 'Evento já cadastrado' });
   }

    const { name, descricao, localizacao, date, user_id, banner_id } = Meetups.create(req.body);

    return res.json(name, descricao, localizacao, date, user_id, banner_id);
  };
}

export default new MeetappController();