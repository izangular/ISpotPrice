import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { GeoLocationService } from '../../providers/geo-location.service';
import { CameraService } from '../../providers/camera.service';
import { IProperty } from './IProperty';
import { PropertyCard } from './property-card';

@Component({
  selector: 'property-card-list',
  templateUrl: 'property-card-list.html'
})
export class PropertyCardList {
    public propertyList : IProperty[];
    public base64Image : string;
    
    constructor(public navCtrl : NavController,
              private alertCtrl : AlertController,
              private geolocation: GeoLocationService,
              private camera: CameraService
            ) {}

    ngOnInit() {
        this.propertyList = [];

    }

    deleteProperty(index) {
        let confirm = this
        .alertCtrl
        .create({
            title: 'Sure you want to delete this property? There is NO undo!',
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
                    .propertyList
                    .splice(index, 1);
                //return true;
                }
            }
            ]
        });
        confirm.present();
    }

    takePhoto() {
        console.log("Take1");
        this.camera.capturePhoto()
        .then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,'+ imageData;

            let lat = 0;
            let lon = 0;
            //Get cordinates
            console.log("Take2");
            this.geolocation.getGeoLocation()
                    .then((resp) => {
                        console.log("Take 101");
                        lat = resp.coords.latitude;
                        lon = resp.coords.longitude;
                        console.log(lat + ' ' + lon);
                }).catch((error) => {
                    console.log('Error getting location', error);
            }).then(function(){
                console.log("Take3");
                let property : IProperty = {
                    imageData: this.base64Image, 
                    latitude: lat, 
                    longitude: lon,

                    street: "Tramstrasse 10",
                    zip: "8050",
                    town: "Zürich",
                    microRating: 4.5,
                    objectType: "House",
                    price: 5000000,

                    surfaceLiving: -2,
                    roomNb: -2,
                    buildYear: -2
                };

                this
                    .propertyList
                    .push(property);
                this
                    .propertyList
                    .reverse();
            }.bind(this)).catch((error) => {
                console.log('Error getting location', error);
            });

            console.log("Take5");
        }, (err) => {
            console.log(err);
        });
    }

    showPropertyDetails(property)
    {
        this.navCtrl.push(PropertyCard, {propertyData: property});
    }
}