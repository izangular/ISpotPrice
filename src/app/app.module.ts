import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PropertyCardList } from '../pages/card/property-card-list';
import { PropertyCard } from '../pages/card/property-card';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import { GeoLocationService } from '../providers/geo-location.service';
import { CameraService } from '../providers/camera.service';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PropertyCardList,
    PropertyCard
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule, // Put ionic2-rating module here
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PropertyCardList,
    PropertyCard
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    GeoLocationService,
    CameraService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
