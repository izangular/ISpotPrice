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
        
        // if(localStorage.getItem("isregistered")!=="true") 
        // {
        //    this.navCtrl.push(Registration);
        // }
        //else{       
        this.apiService.getToken().subscribe
            ( 
                (data) => {
                                console.log(data);
                            },
                    (error) => {
                        console.log(error);
                    }
            )
     
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
        //}
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
      
      this.apiService.getToken() ;

      this.base64Image = 'data:image/jpeg;base64,'+ imageData;

      let lat = 0;
      let lon = 0;
      //Get cordinates
 
    //   this.geolocation.getGeoLocation()
    //           .then((resp) => {
    //               console.log("Take 101");
    //               lat = resp.coords.latitude;
    //               lon = resp.coords.longitude;
    //               console.log(lat + ' ' + lon);
    //       }).catch((error) => {
    //           console.log('Error getting location', error);
    //       }).then(function(){

        //   this.apiService.getToken().subscribe
        //     ( 
        //         (data) => {
        //                         console.log(data);
        //                     },
        //             (error) => {
        //                 console.log(error);
        //             }
        //     )

    //    this.apiService.getData(this.base64Image,lat,lon).subscribe
    //    (
    //        (data) => {
    //            console.log(data);
    //                     this.street =  data.street;
    //                     this.zip = data.zip;
    //                     this.town = data.town;
    //                     this.country = data.country;
    //                     this.category = data.category;
    //                     this.appraisalValue = data.appraisalValue;
    //                     this.rating = data.rating;
    //                     this.catCode = data.catCode;
    //                  },
    //         (error) => {
    //             console.log(error);
    //         }
    //    )

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
              country : 'switzerland',
            //   street: this.street,
            //   zip: this.zip,
            //   town: this.town,
            //   microRating: this.rating,
            //   objectType: this.category,
            //   price: this.appraisalValue,
            //   country : this.country,
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
        // }.bind(this)).catch((error) => {
        //     console.log('Error getting location', error);
        // }).then(()=>{loading.dismiss();});
        
        loading.dismiss();
        console.log("Take5");
    }, (err) => {
        console.log(err);
    });
  }

  takephototest(){
        
      let lat = 15.3991304;
      let lon = 74.01238510000007; 


    this.camera.capturePhoto()
    .then((imageData) => {
      //loading screen
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Loading...'
      }); 

      loading.present();
      this.base64Image = 'data:image/jpeg;base64,'+ imageData;
      
        this.geolocation.getGeoLocation()
              .then((resp) => {
                  console.log("Take 101");
                  lat = resp.coords.latitude;
                  lon = resp.coords.longitude;
                  console.log(lat + ' ' + lon);
                 
          }).catch((error) => {
              console.log('Error getting location', error);              
          })
          
       

       this.apiService.getData(" Base64 Image text ",lat,lon).subscribe
       (
           (data) => {
                
               console.log(data);
                        this.street =  data.street;
                        this.zip = data.zip;
                        this.town = data.town;
                        this.country = data.country;
                        this.category = data.category;
                        this.appraisalValue = data.appraisalValue;
                        this.rating = data.rating;
                        this.category = data.catCode;
            //  msg = this.alertCtrl.create({title: 'Error', message: this.street + " " + 
            //                                 this.zip + " " +
            //                                 this.town + " " +
            //                                 this.country + " " +
            //                                 this.category + " " +
            //                                 this.appraisalValue + " " +
            //                                 this.rating + " " +
            //                                 this.category
            //                                 })
            // msg.present();
    //                  let lat = 47.89012;
    //   let lon = 8.345123;

       let property : IProperty = {     
              imageData: this.base64Image, 
              latitude: lat, 
              longitude: lon,
              
              
              street: this.street,
              zip: this.zip,
              town: this.town,
              microRating: parseInt(this.rating),
              objectType: this.category,
              price: parseInt(this.appraisalValue),
              country : this.country,
              LandSurface:800,
              surfaceLiving: 100,
              roomNb: 3,
              bathNb:5,
              buildYear: 2005

              
          };

          this.showPropertyDetails(property);
          loading.dismiss();
                     },
            (error) => {
                console.log(error);
                
            }
       )
   })
    //   let lat = 0;
    //   let lon = 0;

    //    let property : IProperty = {     
    //           imageData: this.base64Image, 
    //           latitude: lat, 
    //           longitude: lon,
              
    //           street: "Tramstrasse 10",
    //           zip: "8050",
    //           town: "Zürich",
    //           microRating: 3,
    //           objectType: "House",
    //           price: 5000000,
    //           country : 'switzerland',
    //         //   street: this.street,
    //         //   zip: this.zip,
    //         //   town: this.town,
    //         //   microRating: this.rating,
    //         //   objectType: this.category,
    //         //   price: this.appraisalValue,
    //         //   country : this.country,
    //           LandSurface:800,
    //           surfaceLiving: -2,
    //           roomNb: -2,
    //           bathNb:5,
    //           buildYear: -2

              
    //       };

    //       this.showPropertyDetails(property);
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
 
       this.apiService.getToken().subscribe
       ( 
           (data) => {
                        console.log(data);
                     },
            (error) => {
                console.log(error);
            }
       )

       this.apiService.getData("",47.409123,8.546728).subscribe
       (
           (data) => {
               console.log(data);
                        console.log(data.street);
                        console.log(data.zip);
                        console.log(data.town);
                        console.log(data.country);
                        console.log(data.category);
                        console.log(data.appraisalValue);
                        console.log(data.rating);
                        console.log(data.catCode);
                     },
            (error) => {
                console.log(error);
            }
       )

       this.apiService.getAppraisedData("600","700","3.5","1","2000","2.8","5","8050","Zürich","tramstrasse 10 ","switzerland").subscribe
       (
           (data) => {
               console.log(data);
                        console.log(data.street);
                        console.log(data.zip);
                        console.log(data.town);
                        console.log(data.country);
                        console.log(data.category);
                        console.log(data.appraisalValue);
                        console.log(data.rating);
                        console.log(data.catCode);
                     },
            (error) => {
                console.log(error);
            }
       )
      
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
              country: "swizerland",

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



