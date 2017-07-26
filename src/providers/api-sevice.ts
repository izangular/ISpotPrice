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
    public getToken(credentials) 
    {    
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('https://intweb.iazi.ch/api/auth/v2/login',JSON.stringify(this.authCredentials), { headers: header })
                .timeout(15000)
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
                    }).catch(err => err);
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
          
        return this.http.post("https://devweb.iazi.ch/Service.Report_2407/api/Image/ImageProcessing", JSON.stringify(body),
        { headers: headers})
        .map((res) => res.json()).catch(err => err);;
    }

    //Get AppraisedData using input values//
   public getAppraisedData(surfaceLiving:string, landSurface:string, roomNb:string, bathNb:string, buildYear: string,
                          microRating:string, catCode:string, zip:string, town:string, street:string, country:string) {
        let headers = new Headers();

        let body= { surfaceLiving, landSurface, roomNb, bathNb, buildYear, microRating,
                    catCode, zip, town, street, country
                  };

        headers.append('Content-Type', 'application/json');  
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));

        return this.http.post("https://devweb.iazi.ch/Service.Report_2407/api/Image/ImageProcessing", JSON.stringify(body),
        { headers: headers})
        .map((res) => res.json()).catch(err => err);;
    }

}