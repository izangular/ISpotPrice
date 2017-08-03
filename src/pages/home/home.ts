import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { GeoLocationService } from '../../providers/geo-location.service';
import { CameraService } from '../../providers/camera.service';
import { ApiService } from '../../providers/api-sevice';
import { IProperty } from '../card/IProperty';
import { PropertyCard } from '../card/property-card';
import { Diagnostic } from '@ionic-native/diagnostic'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Diagnostic, ApiService]
})
export class HomePage {

    //public base64Image: string;

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController,
        private geolocation: GeoLocationService,
        private camera: CameraService,
        private diagnostic: Diagnostic,
        private loadingCtrl: LoadingController,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        //this.propertyList = [];

        this.getToken();

        //check if location enabled - android
        // this.diagnostic.isLocationEnabled().then((state) => {
        //     if (state == false) {
        //         let msg = this.alertCtrl.create({
        //             title: 'Error', message: 'Location is not enabled. Go to Settings?',
        //             buttons: [
        //                 {
        //                     text: 'No',
        //                     handler: () => {
        //                         console.log('No Location access');//close app

        //                     }
        //                 }, {
        //                     text: 'Yes',
        //                     handler: () => {
        //                         console.log('Loading settings');
        //                         this.diagnostic.switchToLocationSettings();
        //                         //return true;
        //                     }
        //                 }
        //             ]
        //         });
        //         msg.present();
        //     }
        // }).catch((error) => {
        //     // this.handlError('Error getting location');
        //     console.log('Error getting location', error)
        // });

    }

    takePhoto() {

        let base64Image: string;
        let lat = 15.3991304;//15.3991304;
        let lon = 74.01238510000007;//74.01238510000007; 

        //loading screen
        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Loading...'
        });

        try {
            this.camera.capturePhoto()
                .then((imageData) => {

                    loading.present();

                    //converting photo to base64Image//
                    base64Image = 'data:image/jpeg;base64,' + imageData;

                    //get lat lon//
                    this.geolocation.getGeoLocation()
                        .then((resp) => {
                            console.log("Take 101");
                            lat = resp.coords.latitude;
                            lon = resp.coords.longitude;
                            console.log(lat + ' ' + lon);

                        }).catch((error) => {
                            this.handlError('Error getting location');
                            loading.dismiss();
                            console.log('Error getting location', error);
                        })

                    //check token in local storage, if not call getToken service//
                    if (localStorage.getItem('auth_token_type') == undefined) {
                        this.getToken();
                    }

                    //get data from service , imageprocessing call//
                    this.apiService.getData(base64Image, lat, lon).subscribe
                        (
                        (data) => {

                            if (data !== undefined) {
                                console.log(data);

                                let property: IProperty = {
                                    imageData: base64Image,
                                    latitude: lat,
                                    longitude: lon,

                                    street: data.street,
                                    zip: data.zip,
                                    town: data.town,
                                    microRating: parseInt(data.rating),
                                    objectType: data.catCode,
                                    price: parseInt(data.appraisalValue),
                                    country: data.country,

                                    //Default values//
                                    LandSurface: 800,
                                    surfaceLiving: 100,
                                    roomNb: 3,
                                    bathNb: 5,
                                    buildYear: 2005
                                };

                                this.showPropertyDetails(property);
                                loading.dismiss();
                            }
                        },
                        (error) => {
                            this.handlError('Something went wrong');
                            console.log(error);
                            loading.dismiss();
                        }
                        )
                }).catch((error) => {
                    this.handlError('Some problem with camera');
                    loading.dismiss();
                    console.log('Cant capture picture', error);
                })
        }
        catch (error) {
            this.handlError('Something went wrong');
            loading.dismiss();
        }
    }

    showPropertyDetails(property) {
        this.navCtrl.push(PropertyCard, { propertyData: property });

    }

    // showPropertyDetailsTest() {

    //     this.apiService.getToken().subscribe
    //         (
    //         (data) => {
    //             console.log(data);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //         )

    //     this.apiService.getData("", 47.409123, 8.546728).subscribe
    //         (
    //         (data) => {
    //             console.log(data);
    //             console.log(data.street);
    //             console.log(data.zip);
    //             console.log(data.town);
    //             console.log(data.country);
    //             console.log(data.category);
    //             console.log(data.appraisalValue);
    //             console.log(data.rating);
    //             console.log(data.catCode);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //         )

    //     this.apiService.getAppraisedData("600", "700", "3.5", "1", "2000", "2.8", "5", "8050", "Zürich", "tramstrasse 10 ", "switzerland").subscribe
    //         (
    //         (data) => {
    //             console.log(data);
    //             console.log(data.street);
    //             console.log(data.zip);
    //             console.log(data.town);
    //             console.log(data.country);
    //             console.log(data.category);
    //             console.log(data.appraisalValue);
    //             console.log(data.rating);
    //             console.log(data.catCode);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //         )

    //     let property: IProperty = {
    //         imageData: this.base64Image,
    //         latitude: 0,
    //         longitude: 0,

    //         street: "Tramstrasse 10",
    //         zip: "8050",
    //         town: "Zürich",
    //         microRating: 3,
    //         objectType: "House",
    //         price: 5000000,
    //         country: "swizerland",

    //         //street: this.street,
    //         //zip: this.zip,
    //         //town: this.town,
    //         //microRating: this.rating,
    //         //objectType: this.category,
    //         //price: this.appraisalValue,

    //         LandSurface: 800,
    //         surfaceLiving: -2,
    //         roomNb: -2,
    //         bathNb: 5,
    //         buildYear: -2


    //     };


    //     this.navCtrl.push(PropertyCard, { propertyData: property });

    // }

    // getData(imageBase64, latitude, longitude) {
    //     this.apiService.getData(imageBase64, latitude, longitude).subscribe(
    //         (data) => {
    //             console.log(data);
    //             this.zip = data.zip;
    //             this.town = data.town;
    //             this.street = data.street;
    //             this.country = data.country;
    //             this.category = data.category;
    //             this.appraisalValue = data.appraisalValue;
    //             this.rating = data.rating;
    //         }
    //     )
    // }


    getToken() {
        this.apiService.getToken().subscribe
            (
            (data) => {
                console.log(data);
                if (data == null) {
                    this.handlError("Error: Something went wrong");
                }

            },
            (error) => {
                this.handlError("Error: Something went wrong");
                console.log(error);
            }
            )
    }

    handlError(message) {
        let msg = this.alertCtrl.create({
            title: 'Error', message: message,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        console.log(message);//close app

                    }
                }
            ]
        });
        msg.present();
    }

}



