import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IDepartmentList, Department } from '../data-model/IDepartment';
import { CustomHttp, HttpService } from '../utils/index';


@Injectable()
export class DashboardService {
  private _dashboardServiceUrl = '/Dashboard/';  
  public options;

  //constructor(private _http: Http, private http: CustomHttp) { 
  constructor(private http: HttpService) { 
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });     
  }

  async getEmployeeLeaveSummary(employeeId: number) {
    let url: string = this._dashboardServiceUrl + 'GetEmployeesLeaveSummary?employeeId=' + employeeId;    
    console.log(url);
    return await this.http.get(url).toPromise();
  }

//   getObsDepartmentList() : Observable<IDepartmentList[]> {
//     let url: string = this._dashboardServiceUrl + 'GetDepartmentList';    
//     console.log(url);
//     return this.http.get(url)
//                 .map((response: Response) => <IDepartmentList[]>response.json())                
//                 .catch(this.handleError);
//   }

 private extractData(res: Response) {
    var headers = res.headers;
    console.log('Header: ' + res.headers.get("cache-control"));
    console.log('Location: ' + res.headers.get("expires"));  
    console.log('Location: ' + res.headers.get('x-roles'));  
    
    let body = res.json();    
    console.log(body);

    let head = res.headers.toJSON();
    console.log(head);

    

    //var setCookieHeader = headers.get('Set-Cookie');
      
    
    localStorage.setItem('setCookie', res.headers.get("x-roles"));
    
    return body;
    //console.log('Extract data :' + body || {});
    //return body.data || {};    
  }

  handleError(error: Response) {      
    //console.error(error.toString());
    return Observable.throw(error);
  }  
}
