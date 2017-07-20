import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { IProperty } from './IProperty';


@Component({
  selector: 'property-card',
  templateUrl: 'property-card.html'
})
export class PropertyCard {
    public propertyData : IProperty;

    constructor(public navCtrl : NavController,
                private alertCtrl : AlertController, 
                private navParams: NavParams
            ) {}

    ngOnInit() {
        this.propertyData = this.navParams.get('propertyData');
    }

    back(){
        this.navCtrl.pop();
    }
}