import {Component} from '@angular/core';
import {NavController, AlertController, NavParams, LoadingController} from 'ionic-angular';
import { IProperty } from './IProperty';
import { ApiService } from '../../providers/api-sevice';

@Component({
  selector: 'property-card',
  templateUrl: 'property-card.html',
  providers:[ApiService]
})
export class PropertyCard {
    public propertyData : IProperty;

    constructor(public navCtrl : NavController,
                private alertCtrl : AlertController, 
                private navParams: NavParams,
                private apiService: ApiService,
                 private loadingCtrl:LoadingController,
            ) {}

    ngOnInit() {
        this.propertyData = this.navParams.get('propertyData');
    }

    back(){
        this.navCtrl.pop();
    }

    appraise(){
       console.log("Appraise");
       console.log(this.propertyData.surfaceLiving.toString());
       console.log(this.propertyData.LandSurface.toString());
       console.log(this.propertyData.roomNb.toString());
       console.log(this.propertyData.bathNb.toString());
       console.log(this.propertyData.buildYear.toString());
       console.log(this.propertyData.microRating.toString());
       console.log(this.propertyData.objectType);
       console.log(this.propertyData.zip);
       console.log(this.propertyData.town);
       console.log(this.propertyData.street);
       console.log(this.propertyData.country);

    //    this.apiService.getToken().subscribe
    //         ( 
    //             (data) => {
    //                             console.log(data);
    //                         },
    //                 (error) => {
    //                     console.log(error);
    //                 }
    //         )
  
   let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Estimation in Progress...'
      }); 
      loading.present();

       this.apiService.getAppraisedData(this.propertyData.surfaceLiving.toString(),this.propertyData.LandSurface.toString(),this.propertyData.roomNb.toString(),
                                        this.propertyData.bathNb.toString(),this.propertyData.buildYear.toString(),this.propertyData.microRating.toString(),
                                        this.propertyData.objectType, this.propertyData.zip ,this.propertyData.town,this.propertyData.street,this.propertyData.country).subscribe
       (
           (data) => {
               console.log(data);
                        this.propertyData.street =  data.street;
                        this.propertyData.zip =  data.zip;
                        this.propertyData.town = data.town;
                        this.propertyData.country = data.country;
                        this.propertyData.country = data.category;
                        this.propertyData.price = data.appraisalValue;
                        this.propertyData.microRating = data.rating;
                        this.propertyData.objectType =  data.catCode;

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
            },
            ()=>{
                 loading.dismiss();
            }
       )


       // this.propertyData.price = Math.round(Math.random() * 1000000);
    }
}