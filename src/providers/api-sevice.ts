// import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    // This is where your methods and properties go, for example: 
    constructor(private http: Http){}

    public getData(imagedata:any, latitude:number, longitude:number) {
        let header = new Headers();

        let body= {
            imageBase64: imagedata,
            latitude: latitude,
            longitude: longitude
        };

        header.append('Content-Type', 'application/json');       
        return this.http.post("https://devweb.iazi.ch/Service.Report_2407/api/Image/ImageProcessing", JSON.stringify(body),
        { headers: header})
        .map((res) => res.json());
    }

//     public getToken(credentials) {    
//     let header = new Headers();
//         header.append('Content-Type', 'application/json');
//     return this.http.post('https://intweb.iazi.ch/api/auth/v2/login',
//         JSON.stringify(credentials), { headers: header }
//       )
//       .timeout(15000)
//       .map((response: Response) => {
//         let auth = response.json();
//         if (auth && auth.token) {
//             localStorage.setItem('auth_token', auth.token);
//             localStorage.setItem('auth_token_type', auth.token_type);
//           return auth.token;
//         }else return null;
//       }).catch(err => err);
//   }


}