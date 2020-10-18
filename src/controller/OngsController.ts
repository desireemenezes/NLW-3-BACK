import { getRepository } from 'typeorm';
import { Request, Response} from 'express';
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
            open_on_weekends,
            whats_app,
            facebook
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
            whats_app,
            facebook,  
            images
        };
       
       /*  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
        whats_app: Yup.string().matches(phoneRegExp, "Phone number is not valid").nullable() */

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            whats_app: Yup.string().nullable(),
            facebook:  Yup.string().nullable(),
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
            whats_app,
            facebook,   
            images
        });

        await schema.validate(data, {
            abortEarly: false,
            
        })
        await ongRepository.save(ongDestruct);
        return response.status(201).json(ongDestruct)

    }
}

