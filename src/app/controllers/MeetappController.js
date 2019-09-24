import Meetups from '../models/Meetapp';
import { startOfHour, parseISO, isBefore } from 'date-fns';
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


    // Checar se o user_id existe tem nem sentido nesse caso, mas só por garantia mesmo
    const isUser = await User.findOne({
      where:{ id: req.userId }
    });

    if(!(isUser)){
      return res.status(401).json({error: 'Sessão expirada logue novamente'})
    }
    
    //Converter a data e armazenar em uma variavel
    //Zerando valores de minutos e segundos
    const hourStart = startOfHour(parseISO(date));

    if(isBefore(hourStart, new Date())){
      return res.status(400).json({error: "Não é permitido cadastrar eventos para datas passadas"})
    }

    //Verificar se o horário já está ocupado
    const checkAvailability = await Meetups.findOne({
      where: {
        date: hourStart,
        canceled_at: null,
      }
    });
    if(checkAvailability){
      return res.status(400).json({error: "O horário já está reservado!"})
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