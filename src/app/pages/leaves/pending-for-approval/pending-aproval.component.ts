import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

import { ToasterModule, ToasterService, ToasterConfig, Toast} from 'angular2-toaster';

import { LeaveService, AuthenticationService } from '../../../@core/data/index';
import { LeaveDetails, LeaveApplication } from '../../../@core/data-model/index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-pending-approval-leaves-list',
  templateUrl: './pending-approval.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],


})
export class PendingApprovalLeavesComponent {
  date: Date;
  data: LeaveApplication[] = [];
  //data: LeaveDetails[];
  // filterQuery = "";
  // rowsOnPage = 10;
  // sortBy = "code";
  // sortOrder = "asc";
  // navigationExtras;
  employeeId;

  source: LocalDataSource = new LocalDataSource();
  //data;
  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right'
  });
  private toasterService1: ToasterService;
  
  //dialogRef: MatDialogRef<ConfirmationDialog>;

  constructor(private router: Router, 
              private leaveService: LeaveService,
              private authService: AuthenticationService,
              private datePipe: DatePipe,
              //private toasterService : ToasterService
            ) { 
    this.date = new Date();
    this.employeeId = this.authService.userId;
  }
  
  ngOnInit() {
    this.loadPendingApprovalLeaveList(this.employeeId);
  }

  async loadPendingApprovalLeaveList(employeeId : number){
    console.log('loadMyLeaveList has been called...');
    // this.leaveService.getEmployeeLeaveList(employeeId)
    //                  .subscribe(
    //                    res=> {
    //                       //console.log(res);
    //                       console.log('Return Data: ' + res[0].EmployeeLeaves);
    //                       this.data = res[0].EmployeeLeaves;
    //                       this.source.load(this.data);
    //                     },
    //                    err=> {
    //                     console.log('Error on load Employee Leave List : ' + err);
    //                   })

    this.leaveService.getPendingForApprovalLeaveListAsync(employeeId)
                     .then(res=> {
                          //console.log(res.json());
                          var result = res.json();
                          //console.log(data);
                          result.forEach(element => {
                            element.EmployeeLeaves.forEach(el => {
                              var la = new LeaveApplication;                            
                              //console.log(element);                            
                              la.EmployeeFullName = element.EmployeeFullName;
                              la.DepartmentName = element.DepartmentName;
                              
                              la.EmployeeLeaveId = el.EmployeeLeaveId;
                              la.LeaveFromDate = el.LeaveFromDate;
                              la.LeaveToDate = el.LeaveToDate;
                              la.LeaveStatusCode = el.LeaveStatusCode;
                              la.LeaveStatusDescription = el.LeaveStatusDescription;
                              la.LeaveTypeCode = el.LeaveTypeCode;
                              la.LeaveTypeDescription = el.LeaveTypeDescription;
                              la.RequestDate = el.RequestDate;
                              la.NoOfDays = el.NoOfDays;
                              la.Description = el.Description;

                              this.data.push(la);
                            });
                          });
                          //this.data = res.json()[0].EmployeeLeaves;
                          console.log(this.data);
                          this.source.load(this.data);
                        })
                      .catch(err=> {
                        console.log('Error on load Employee Leave List : ' + err);
                      })
  }

  onDeleteConfirm(event): void {
      // if (window.confirm('Are you sure you want to delete?')) {
      //   event.confirm.resolve();
         console.log(event.data.EmployeeLeaveId);
          this.router.navigate(['/pages/leaves/approveLeave/' + event.data.EmployeeLeaveId]);
      // } else {
      //   event.confirm.reject();
      // }
  }

    applyDateFormat(date) : any { 
      var raw = new Date(date);

      var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');      
      return formatted; 
    }

    settings = {
      actions:{
        add:false,
        edit: false,
        // edit: {
        //   mode: 'inline',    //'inline'|'external',
        // },
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-edit"></i>',
        confirmDelete: true,
      },
      columns: {
        // EmployeeLeaveId: {
        //   title: 'ID',
        //   type: 'number',
        //   width: 5
        // },
        EmployeeFullName: {
          title: 'Employee Name',
          type: 'string'
        },
        RequestDate: {
          title: 'Request Date',
          type: 'string',
          valuePrepareFunction: (date) => {
            return this.applyDateFormat(date);
          }         
        },
        LeaveTypeDescription: {
          title: 'Leave Description',
          type: 'string',
        },
        LeaveFromDate: {
          title: 'From Date',
          type: 'string',
          valuePrepareFunction: (date) => {
            return this.applyDateFormat(date);
          }
        },
        LeaveToDate: {
          title: 'To Date',
          type: 'string',
          valuePrepareFunction: (date) => {
            return this.applyDateFormat(date);
          }
        },
        LeaveStatusDescription: {
          title: 'Leave Status',
          type: 'string',
        },
        NoOfDays: {
          title: 'No of Day(s)',
          type: 'number',        
        },    
      },
    };
}

  // remove(item) : void {
  //   console.log(<LeaveApplication>item);
  //   let requestData = <LeaveApplication>item;
  //   requestData.EmployeeId = this.employeeId;

  //   // if(requestData.LeaveStatusDescription == enumLeaveStatus[enumLeaveStatus.Withdrew]){
  //   //   alert('Leave application is already Withdrew.');
  //   //   return;
  //   // }

  //   this.leaveService.WithdrawLeave(requestData)
  //                         .subscribe(response=> {
  //                             console.log(response);
  //                             this.loadMyLeaveList(this.employeeId);
  //                           },
  //                           err=>{ console.log('Error on Delete Department :' + err); }
  //                         );
  // }

  

