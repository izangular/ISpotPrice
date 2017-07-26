import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import { GeoLocationService } from '../../providers/geo-location.service';
import { CameraService } from '../../providers/camera.service';
import { ApiService } from '../../providers/api-sevice';
import { IProperty } from '../card/IProperty';
import { PropertyCard } from '../card/property-card';
import { Diagnostic } from '@ionic-native/diagnostic'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Diagnostic,ApiService]
})
export class HomePage {
      public propertyList : IProperty[];
      public base64Image : string;
      public zip : string;
      public town : string;
      public street : string;
      public category : string;
      public country : string;
      public appraisalValue : string;
      public rating : string;

  constructor(public navCtrl : NavController,
              private alertCtrl : AlertController,
              private geolocation: GeoLocationService,
              private camera: CameraService,
              private diagnostic:Diagnostic,
              private loadingCtrl:LoadingController,
              private apiService : ApiService
            ) {}

  ngOnInit() {
    this.propertyList = [];
        
        //check if location enabled - android
        this.diagnostic.isLocationEnabled().then((state)=>{
        if(state==false)
        {
            let msg = this.alertCtrl.create({title: 'Error', message:'Location is not enabled. Go to Settings?', 
            buttons: [
            {
                text: 'No',
                handler: () => {
                console.log('No Location access');//close app
                
                }
            }, {
                text: 'Yes',
                handler: () => {
                console.log('Loading settings');
                this.diagnostic.switchToLocationSettings();
                //return true;
                }
            }
            ]});
            msg.present();
        }
        }).catch((error) => {
            console.log('Error getting location', error)});
  }

  takePhoto() {
    console.log("Take1");
    this.camera.capturePhoto()
    .then((imageData) => {
      //loading screen
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Loading...'
      }); 
      loading.present();

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
       
          //this.getData(this.base64Image,lat,lon);

          let property : IProperty = {     
              imageData: this.base64Image, 
              latitude: lat, 
              longitude: lon,
              
              street: "Tramstrasse 10",
              zip: "8050",
              town: "Zürich",
              microRating: 3,
              objectType: "House",
              price: 5000000,

              //street: this.street,
              //zip: this.zip,
              //town: this.town,
              //microRating: this.rating,
              //objectType: this.category,
              //price: this.appraisalValue,
              LandSurface:800,
              surfaceLiving: -2,
              roomNb: -2,
              bathNb:5,
              buildYear: -2

              
          };

          this.showPropertyDetails(property);

          this
              .propertyList
              .push(property);
          this
              .propertyList
              .reverse();             
        }.bind(this)).catch((error) => {
            console.log('Error getting location', error);
        }).then(()=>{loading.dismiss();});
        
        
        console.log("Take5");
    }, (err) => {
        console.log(err);
    });
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

  showPropertyDetails(property){
        this.navCtrl.push(PropertyCard, {propertyData: property});
  }

  showPropertyDetailsTest(){
      let property : IProperty = {     
              imageData: this.base64Image, 
              latitude: 0, 
              longitude: 0,
              
              street: "Tramstrasse 10",
              zip: "8050",
              town: "Zürich",
              microRating: 3,
              objectType: "House",
              price: 5000000,

              //street: this.street,
              //zip: this.zip,
              //town: this.town,
              //microRating: this.rating,
              //objectType: this.category,
              //price: this.appraisalValue,
              
             LandSurface: 800,
             surfaceLiving: -2,
             roomNb: -2,
             bathNb:5,
             buildYear: -2

              
          };
    this.navCtrl.push(PropertyCard, {propertyData: property});
  }

  getData(imageBase64, latitude, longitude){
      this.apiService.getData(imageBase64,latitude,longitude).subscribe(
            (data) => 
            {
                console.log(data);
                this.zip = data.zip;
                this.town = data.town;
                this.street = data.street;
                this.country = data.country;
                this.category = data.category;
                this.appraisalValue = data.appraisalValue;
                this.rating = data.rating;
            }
      )
  }

}



