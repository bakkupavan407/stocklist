import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class FilterService {
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

    getfilterdata(data): Observable<any> {
        return this.http.post( this.serviceUrl + "getfilterdata" , data, {headers: this.headers})
            .map((response: Response) => {
                response = response.json();
                if(response) {
                    return response["data"];
                }
                return response;
            });
    }

}