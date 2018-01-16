import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CustomHttp } from "../utils/custom-http";
import { LeaveApplication, EmployeeLeaveList, EmployeeLeaveLog } from '../data-model/ILeaves';


@Injectable()
export class LeaveService {
    private _leaveServiceUrl = '/Leaves/';
    public options;
    //private _http: Http,
    constructor(private http: CustomHttp) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: headers });
    }

    getEmployeeLeaveList(employeeId: number) : Observable<EmployeeLeaveList> {
      let url: string = this._leaveServiceUrl + "GetEmployeeLeaves?employeeId=" + employeeId;
  
      return this.http.get(url)
                  .map((response: Response) => <EmployeeLeaveList>response.json())
                  .catch(this.handleError);
    }

    async getEmployeeLeaveListAsync(employeeId: number) {
      let url: string = this._leaveServiceUrl + "GetEmployeeLeaves?employeeId=" + employeeId;
      console.log(url);
      return await this.http.get(url).toPromise();
    }

    getEmployeeLeaveDetails(employeeLeaveId: number) {
      let url: string = this._leaveServiceUrl + 'GetEmployeesLeaveDetail?employeeLeaveId=' + employeeLeaveId;
      //console.log(url);
      return this.http.get(url)
                  .map((response: Response) => response.json() as LeaveApplication)  
                  //.map((response: Response) => {console.log(<LeaveApplication>response.json())})  
                  //.map((response: Response) => {console.log(response.json() as LeaveApplication)})  
                  .catch(this.handleError);

      // return this._http.get(url)
      //             .map(res => res.json() as LeaveApplication)  //.map(res => res.json() as IDepartmentList[])  
      //             .catch(this.handleError);

    }

    ApplyForLeave(leaveRequest: LeaveApplication ) : Observable<any> {
        let url : string = this._leaveServiceUrl + 'ApplyForLeave';
     
        return this.http.post(url, leaveRequest, this.options)
                          .map(this.extractData)
                          .catch(this.handleError);
    }

    UpdateaAppliedForLeave(leaveRequest: LeaveApplication ) : Observable<any> {
      let url : string = this._leaveServiceUrl + 'UpdateAppliedLeaveApplication';
   
      return this.http.post(url, leaveRequest, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    WithdrawLeave(leaveRequest: LeaveApplication ) : Observable<any> {
    //WithdrawLeave(leaveRequest: number) : Observable<any> {
      let url : string = this._leaveServiceUrl + 'WithdrawLeave';

      //let requestData = { employeeLeaveId: leaveRequest }
   
      return this.http.post(url, leaveRequest, this.options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }


    GetEmployeesLeaveLogList(employeeLeaveId: number) : Observable<EmployeeLeaveLog[]> {
      let url: string = this._leaveServiceUrl + 'GetEmployeesLeaveLogList?employeeLeaveId=' + employeeLeaveId;
  
      return this.http.get(url)
                  .map((response: Response) => <EmployeeLeaveLog[]>response.json())                
                  .catch(this.handleError);
    }


      
    private extractData(res: Response) {
      let body = res.json();
      return body;
      //console.log('Extract data :' + body || {});
      //return body.data || {};    
    }
    
      handleError(error: Response) {
        console.error(error.toString());
        return Observable.throw(error);
      }
    


}