import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { IProperty } from './IProperty';
import { ApiService } from '../../providers/api-sevice';

@Component({
    selector: 'property-card',
    templateUrl: 'property-card.html',
    providers: [ApiService]
})
export class PropertyCard {
    public propertyData: IProperty;

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController,
        private navParams: NavParams,
        private apiService: ApiService,
        private loadingCtrl: LoadingController,
    ) { }

    ngOnInit() {
        this.propertyData = this.navParams.get('propertyData');
    }

    back() {
        this.navCtrl.pop();
    }

    appraise() {

        let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Estimation in Progress...'
        });

        try {
            loading.present();

            this.apiService.getAppraisedData(this.propertyData.surfaceLiving.toString(), this.propertyData.LandSurface.toString(), this.propertyData.roomNb.toString(),
                this.propertyData.bathNb.toString(), this.propertyData.buildYear.toString(), this.propertyData.microRating.toString(),
                this.propertyData.objectType, this.propertyData.zip, this.propertyData.town, this.propertyData.street, this.propertyData.country).subscribe
                (
                (data) => {
                    console.log(data);
                    this.propertyData.street = data.street;
                    this.propertyData.zip = data.zip;
                    this.propertyData.town = data.town;
                    this.propertyData.country = data.country;
                    this.propertyData.country = data.category;
                    this.propertyData.price = data.appraisalValue;
                    this.propertyData.microRating = data.rating;
                    this.propertyData.objectType = data.catCode;
                },
                (error) => {
                    this.handlError("Something went wrong");
                    console.log(error);
                },
                () => {
                    loading.dismiss();
                }
                )
        }
        catch (error) {
            this.handlError("Something went wrong");
        }
        finally {
            loading.dismiss();
        }
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