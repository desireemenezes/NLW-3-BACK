import  Image from '../models/Image';
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://localhost:3333/oploads/${image.path}`,
           
        }
    },

    renderMany(images: Image[]){
        return images.map(images => this.render(images));

    }
}