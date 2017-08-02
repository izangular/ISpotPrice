// import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {

    public authCredentials = { userEmail: 'appservice@iazi.ch', userPwd: 'LetsT3st', app: 'appService,address,macro,micro,modelr', culture: 'en', keepLogin: false };

    // This is where your methods and properties go, for example: 
    constructor(private http: Http){}
 
    //Get Token from ServiceAuth API//
    public getToken() 
    {    
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('https://intweb.iazi.ch/api/auth/v2/login',{ "userEmail": 'appservice@iazi.ch', "userPwd": 'LetsT3st', "app": 'appService,address,macro,micro,modelr'}, { headers: header })
                .map((response: Response) => 
                {                    
                    let auth = response.json();
                    if (auth && auth.token) 
                    {
                        localStorage.setItem('auth_token', auth.token);
                        localStorage.setItem('auth_token_type', auth.token_type);                       
                        return auth.token;
                    }
                    else return null;
                    });
    }

  //Get AppraisedData using Default Values//
  public getData(imagedata:any, latitude:number, longitude:number) {
        let headers = new Headers();

        let body= {
            imageBase64: imagedata,
            latitude: latitude,
            longitude: longitude
        };

        headers.append('Content-Type', 'application/json');  
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));   
          
        return this.http.post("https://intservices.iazi.ch/api/apps/ImageProcessing", JSON.stringify(body),
        { headers: headers})
        .map((res) => res.json());
    }

    //Get AppraisedData using input values//
   public getAppraisedData(surfaceLiving:string, landSurface:string, roomNb:string, bathNb:string, buildYear: string,
                          microRating:string, catCode:string, zip:string, town:string, street:string, country:string) {
        let headers = new Headers();

        let body= { surfaceLiving : surfaceLiving, landSurface : landSurface, roomNb : roomNb, bathNb : bathNb, buildYear : buildYear, microRating : microRating,
                    catCode : catCode, zip : 8050, town : "Zürich", street : "tramstrasse 10", country : "switzerland"
                   };

        // let body= { surfaceLiving : 600, landSurface : 700, roomNb : 3.5, bathNb : 1, buildYear : 2000, microRating : 2.8,
        //             catCode : 5, zip : 8050, town : "Zürich", street : "tramstrasse 10", country : "switzerland"
        //           };

    
        headers.append('Content-Type', 'application/json');  
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

        return this.http.post("https://intservices.iazi.ch/api/apps/AppraiseProperty", JSON.stringify(body),
        { headers: headers})
        .map((res) => res.json());
    }

}