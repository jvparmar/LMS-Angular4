import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';
import { RegistrationRequest } from '../data-model/index';
 
@Injectable()
export class AuthenticationService {
    private BASE_URL = appConfig.apiUrl + '/Auth';
    ID_KEY = 'id';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';
    ROLE_KEY = 'role';
    public options;

    constructor(private http: Http) { 
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: headers });        
    }
 
    login(username: string, password: string) {
        //return this.http.post(appConfig.apiUrl + '/users/authenticate', { username: username, password: password })
        return this.http.post(this.BASE_URL + '/Login', { Email: username, Password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                //console.log(user);
                if (user && user.Token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem(this.TOKEN_KEY, JSON.stringify(user.Token));
                    // localStorage.setItem(this.NAME_KEY, JSON.stringify(user.FirstName));
                    localStorage.setItem(this.ID_KEY, user.Id);
                    localStorage.setItem(this.TOKEN_KEY, user.Token);
                    localStorage.setItem(this.NAME_KEY, user.FirstName);
                    localStorage.setItem(this.ROLE_KEY, user.IsManager ? "Manager" : "Employee");
                }
 
                return user;                
            });
    }

    register(department: any) : Observable<any> {
        console.log('Auth Service Register: ' + <RegistrationRequest>department);
        let url : string = this.BASE_URL + '/Register';
     
        return this.http.post(url, department, this.options)
                          .map((response: Response) => this.authenticate(response))
                          //.catch(this.handleError);
      }

    authenticate(res) {
        var authResponse = res.json();

        if(!authResponse.Token)
            return;

        localStorage.setItem(this.TOKEN_KEY, authResponse.Token);
        localStorage.setItem(this.NAME_KEY, authResponse.FirstName);
    }

    get Token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get name(){
        return localStorage.getItem(this.NAME_KEY);
    }

    get userId() {
        return localStorage.getItem(this.ID_KEY);
    }

    get isAuthenticate() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get isManager(){
        return !!localStorage.getItem(this.ROLE_KEY);
    }
     
    logout() {        
        // remove user from local storage to log user out
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.NAME_KEY);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
        //console.log('Extract data :' + body || {});
        //return body.data || {};    
    }

    private handleError(error: Response) {
        //console.error(error.toString());
        return Observable.throw(error);
    }
}