import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public serviceUrl: string = "https://appstockslist.herokuapp.com/";
    // public serviceUrl: string = "http://localhost:4000/";
    public token: string;
    public currentUser: any;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post( this.serviceUrl + "login", { email: username, password: password })
            .map((response: Response) => {
                this.currentUser = response.json();
                if(this.currentUser.status === "success") {
                    delete this.currentUser.password;
                    // login successful if there's a jwt token in the response
                    let token = this.currentUser && this.currentUser.data.token;
                    if (token) {
                        // set token property
                        this.token = token;
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                        // return true to indicate successful login
                        return this.currentUser.data;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
                } else {
                    return false;
                }
            });
    }

    register(data): Observable<boolean> {
        return this.http.post(this.serviceUrl + "register", data)
          .map((response: Response) => {
            let userdata = response && response.json();
            if(userdata["data"]) {
              return true;
            } else {
              return false;
            }
          });
      }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}