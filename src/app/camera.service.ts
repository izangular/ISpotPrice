import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraService {

    // This is where your methods and properties go, for example: 
    constructor(private camera: Camera){}

    capturePhoto() {
        const options : CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true
        };

        return this
            .camera
            .getPicture(options);
    }
}