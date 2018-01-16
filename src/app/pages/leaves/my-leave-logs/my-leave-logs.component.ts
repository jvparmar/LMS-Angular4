import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../@core/data/index';


@Component({
  selector: 'app-my-leave-logs',
  templateUrl: './my-leave-logs.component.html',
  //styleUrls: ['./my-leave-logs.component.scss'],
  inputs: ['inputEmployeeLeaveId']
})
export class MyLeaveLogsComponent implements OnInit {
  public inputEmployeeLeaveId: number;
  logData;

  constructor(private leaveService: LeaveService) { }

  ngOnInit() {
    console.log('Passed Employee Leave Id: ' + this.inputEmployeeLeaveId);
    this.getMyLeaveApplicationLog(this.inputEmployeeLeaveId);
  }

  getMyLeaveApplicationLog(employeeLeaveId : number){
    this.leaveService.GetEmployeesLeaveLogList(employeeLeaveId)
                     .subscribe(
                       res=> {
                          //console.log(res);
                          //console.log(res[0].EmployeeLeaves);                           
                          this.logData = res;
                        },
                       err=> {
                        console.log('Error on load Employee Leave List : ' + err);
                      })
  }

}
