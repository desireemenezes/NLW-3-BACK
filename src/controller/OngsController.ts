import { getRepository } from 'typeorm';
import { Request, Response} from 'express';
import OngView from '../views/OngsView';
import  Ongs from '../models/Ongs';
import OngsView from '../views/OngsView';
import * as Yup from 'yup';


export default {


    async index(request: Request, response: Response) {
        const ongRepository = getRepository(Ongs);
        const ongs = await ongRepository.find({
            relations: ['images']
        });
        return response.json(OngsView.renderMany(ongs));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const ongRepository = getRepository(Ongs);
        const ong = await ongRepository.findOneOrFail(id,{
            relations: ['images']
        });
        return response.json(OngsView.render(ong));
    },
    
    async create(request: Request, response: Response) {
        const { 
            name, 
            latitude,
            longitude,
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends
        } = request.body;
        
        const ongRepository = getRepository(Ongs);
        
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename}
        })

        const data = {
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,    
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        const ongDestruct = ongRepository.create({
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,    
            images
        });

        await schema.validate(data, {
            abortEarly: false,
            
        })
        await ongRepository.save(ongDestruct);
        return response.status(201).json(ongDestruct)

    }
}

