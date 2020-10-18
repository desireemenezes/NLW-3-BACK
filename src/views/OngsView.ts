import  Ongs from '../models/Ongs';
import ImagesView from '../views/ImageView'
export default {
    render(ong: Ongs) {
        return {
            id: ong.id,
            name: ong.name,
            latitude: ong.latitude,
            longitude: ong.longitude,
            about: ong.about,
            instructions: ong.instructions,
            opening_hours: ong.opening_hours,
            open_on_weekends: ong.open_on_weekends,
            whats_app:ong.whats_app,
            facebook: ong.facebook,
            images: ImagesView.renderMany(ong.images)
        }
    },

    renderMany(ongs: Ongs[]){
        return ongs.map(ong => this.render(ong));

    }
}