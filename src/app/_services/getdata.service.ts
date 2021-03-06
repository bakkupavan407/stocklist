import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class GetDataService {
    public serviceUrl: string = "https://appstockslist.herokuapp.com/";
    // public serviceUrl: string = "http://localhost:4000/";
    public token: string;
    public currentUser: any;
    public headers: Headers;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers({
            'x-access-token': this.token
        });
    }

    getexchanges(): Observable<any> {
        return this.http.get( this.serviceUrl + "api/v1/getexchanges" , {headers: this.headers})
            .map((response: Response) => {
                response = response.json();
                if(response["error"]) {
                    return false;
                } else {
                    return response["data"];
                }
            });
    }

    getsecurities(): Observable<any> {
        return this.http.get( this.serviceUrl + "api/v1/getsecurities" , {headers: this.headers})
            .map((response: Response) => {
                response = response.json();
                if(response) {
                    return response["data"];
                }
            });
    }

    getuserexchanges(): Observable<any> {
        return this.http.get( this.serviceUrl + "getuserexchanges" , {headers: this.headers})
            .map((response: Response) => {
                response = response.json();
                if(response) {
                    return response["data"];
                }
            });
    }

    getusersecurities(): Observable<any> {
        return this.http.get( this.serviceUrl + "getusersecurities" , {headers: this.headers})
            .map((response: Response) => {
                response = response.json();
                if(response) {
                    return response["data"];
                }
            });
    }

}