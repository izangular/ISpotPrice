import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public photos : IGallery[];
  public base64Image : string;
  constructor(public navCtrl : NavController, 
              private camera : Camera, 
              private alertCtrl : AlertController,
              private geolocation: Geolocation
            ) {}

  ngOnInit() {
    this.photos = [];

  }

  deletePhoto(index) {
    let confirm = this
      .alertCtrl
      .create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this
                .photos
                .splice(index, 1);
              //return true;
            }
          }
        ]
      });
    confirm.present();
  }

  takePhoto() {
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        // this.base64Image = "file://" + imageData;
        this.base64Image = 'data:image/jpeg;base64,'+ imageData;

        let lat = 0;
        let lon = 0;
        //Get cordinates

        this.geolocation.getCurrentPosition()
            .then((resp) => {
              lat = resp.coords.latitude;
              lon = resp.coords.longitude;
              console.log(lat + ' ' + lon);
        }).catch((error) => {
          console.log('Error getting location', error);
        }).then(function(){
            console.log(this.glob);
            this
              .photos
              .push( {imageData: this.base64Image, latitude: lat, longitude: lon});
            this
              .photos
              .reverse();
        }.bind(this));
      }, (err) => {
        console.log(err);
      });
  }

}


export interface IGallery {
    imageData: string;
    latitude: number;
    longitude: number;
}