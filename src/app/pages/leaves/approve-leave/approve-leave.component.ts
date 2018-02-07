import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LeaveDetails, LeaveApplication } from '../../../@core/data-model/index';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operator/delay';

import { LeaveService, AuthenticationService } from '../../../@core/data/index';
import { enumLeaveStatus } from '../../../@core/utils/index';
import { NgbDateISOParserFormatter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-approve-leave-application',
    templateUrl: './approve-leave.component.html',
    //styleUrls: ['./leave-application.component.scss'],
    styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `],
    providers: [LeaveService]
  })
  export class ApproveLeaveApplicationComponent implements OnInit {
    form:FormGroup;
    EmployeeLeaveId: AbstractControl;
    // RequestDate: AbstractControl;
    // LeaveFromDate:AbstractControl;
    // LeaveToDate:AbstractControl;
    // LeaveTypeDescription: AbstractControl;
    // NoOfDays: AbstractControl;
    // LeaveStatusDescription: AbstractControl;
    Description: AbstractControl;
    ManagerId: AbstractControl;
    //DateRange: AbstractControl;
    //Email: FormControl;
    //Email: AbstractControl;
  
    public leaveApplication : LeaveApplication;
  
    private sub: any;    
    
    
    //fromDate: NgbDateStruct;
    //toDate: NgbDateStruct;
  
    //employeeId: number;
    isEditMode: boolean = false;
    isAllowToApprove: boolean = false;
    isAllowToReject: boolean = false;
    pEmployeeLeaveId: string;
    //valRequestDate: Date;
    //valEmployeeName: string;
    //valEmail: string;
    dataResult: LeaveApplication[];
    
    
    constructor(private fb: FormBuilder,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private leaveService: LeaveService,
        private authService: AuthenticationService,
        private _parserFormatter: NgbDateParserFormatter,
        private datePipe: DatePipe
        ) 
    { 
        //const pEmployeeLeaveId = this.route.snapshot.paramMap.get('id');
        this.pEmployeeLeaveId = this.route.snapshot.paramMap.get('id');
        
        //console.log('Constructor Employee Leave Id : ' + parseInt(this.pEmployeeLeaveId));
        
        if(isNaN(parseInt(this.pEmployeeLeaveId))){                    
          alert('Invalid Employee Request...');
          this.location.back();
        }
        else{          
          this.isEditMode = true;
        }
    }
    
    ngOnInit() {    
      this.buildForm();
    }

    buildForm() {
      this.form = this.fb.group({
        'EmployeeLeaveId': ['', Validators.required],
        // 'RequestDate': [],
        // 'LeaveFromDate': ['', Validators.compose([Validators.required])],
        // 'LeaveToDate': ['', Validators.compose([Validators.required])],
        // 'LeaveTypeDescription': ['',Validators.compose([Validators.required])],
        // 'NoOfDays':['', Validators.compose([Validators.required])],
        // 'LeaveStatusDescription': [''],
        'Description': [''],
        'ManagerId': [''],
        //'Email': ['', Validators.required]
        //Email: new FormControl({value:'Email', disabled: true}, Validators.required),
      });
    
      this.EmployeeLeaveId = this.form.controls['EmployeeLeaveId'];
      //  this.RequestDate = this.form.controls['RequestDate'];
      //  this.LeaveFromDate = this.form.controls['LeaveFromDate'];         
      //  this.LeaveToDate = this.form.controls['LeaveToDate'];
      //  this.LeaveTypeDescription = this.form.controls['LeaveTypeDescription'];
      //  this.NoOfDays = this.form.controls['NoOfDays'];
      //  this.LeaveStatusDescription = this.form.controls['LeaveStatusDescription'];
      this.Description = this.form.controls['Description'];
      this.ManagerId = this.form.controls['ManagerId'];
      //this.DateRange = this.form.controls['DateRange'];
      //this.Email = this.form.controls['Email'];
                      
        //  this.form.controls['LeaveFromDate'].valueChanges.subscribe( data => {
        //   //console.log("CAMBIOSS ", data);
        //   if(!data || (typeof data === 'string' && data.length == 0)) {
        //     //console.log('To Date selection :' + data);
        //     this.form.patchValue({
        //         LeaveFromDate: null
        //     }, {emitEvent: false});
        //   }
        // });

        // this.form.controls['LeaveToDate'].valueChanges.subscribe( data => {
        //     //console.log("CAMBIOSS ", data);
        //     if(!data || (typeof data === 'string' && data.length == 0)) {
        //       //console.log('To Date selection :' + data);
        //       this.form.patchValue({
        //           LeaveToDate: null
        //       }, {emitEvent: false});
        //     }
        //   });

          if(!this.isEditMode) {
            console.log('New Leave request');
            this.form.setValue({
              //EmployeeLeaveId: 0,
              // RequestDate: Date.now(),        
              // LeaveFromDate: '',
              // LeaveToDate: '',
              // LeaveTypeDescription: '',
              // NoOfDays: 0,
              // LeaveStatusDescription: '',
              // Description: '',
              // //DateRange:''
            })
          }
          else {
            this.sub = this.route.params
            .delay(1000)
            .map(params=>params['id'])
            .switchMap(id=>this.leaveService.getEmployeeLeaveDetails(parseInt(id)))
            .subscribe((response: LeaveApplication) => {
                      if(response === null)
                      {
                        alert('Invalid Employee Request...');
                        this.router.navigate(['/pages/leaves/pendingApprovalLeaves']);
                        //this.location.back();
                      }
                      this.dataResult = [];                      
                      this.leaveApplication = response; 
                      console.log('Leave Application object : ');
                      console.log(this.leaveApplication);
                      // console.log('Leave Application Leave From : ' + response.LeaveFromDate);                      
                      // console.log('Leave Application Request Date : ' + response.RequestDate);
                      // this.valEmployeeName = response.EmployeeFullName;
                      // this.valRequestDate = this.applyDateFormat(response.RequestDate);
                      //this.employeeId = response.EmployeeId;
                      this.dataResult.push(response);
                      
                      this.form.setValue({
                        EmployeeLeaveId: response.EmployeeLeaveId,
                        // RequestDate: this._parserFormatter.parse(response.RequestDate.toString()),                        
                        // LeaveFromDate: this._parserFormatter.parse(response.LeaveFromDate.toString()),                  
                        // LeaveToDate: this._parserFormatter.parse(response.LeaveToDate.toString()),
                        // LeaveTypeDescription: response.LeaveTypeDescription,
                        // NoOfDays: response.NoOfDays,
                        // LeaveStatusDescription: response.LeaveStatusDescription,
                        Description: response.Description,
                        ManagerId: this.authService.userId,
                        //Email: response.Email,                        
                      });

      
                      //console.log('Constant : ' + enumLeaveStatus.Applied);
                      //console.log('Constant : ' + enumLeaveStatus[enumLeaveStatus.Applied]);
      
                      //if(this.form.controls['LeaveStatusDescription'].value == "Approved"){
                      if(this.leaveApplication.LeaveStatusDescription == enumLeaveStatus[enumLeaveStatus.Applied]){
                        this.isAllowToApprove = true;
                        this.isAllowToReject = true;
                        //console.log('Read only: ' + this.isLeaveApproved );
                        //var fieldElement = <HTMLInputElement>document.getElementById('dpLeaveFromDate');
                        //fieldElement.readOnly = true;
                        //this.form.controls['LeaveFromDate'].disable();
                      }
                      else if(this.leaveApplication.LeaveStatusDescription == enumLeaveStatus[enumLeaveStatus.Approved]) {
                        this.isAllowToApprove = false;
                        this.isAllowToReject = true;                        
                      }
                      else
                        this.isAllowToApprove = false;
                      
            }, 
            err=> {
              console.log('Service called Error : ' + err)
            });      
          }
  }

  onApproveLeave() {
    console.log(this.form.value);

    this.leaveService.ApproveLeave(<LeaveApplication>this.form.value)
                        .subscribe(response=> {
                                    console.log('Approve Response');
                                    console.log(response.Message);
                                    console.log(response.ResponseData);
                                  },
                                  err=> {
                                    console.log('Error on Update:');
                                    console.log(err.json().Message);
                                    alert(err.json().Message);
                                    });

    this.router.navigate(['/pages/leaves/pendingApprovalLeaves']);
    //this.location.back();
  }

  onUnapproveLeave(){
    console.log(this.form.value);

    this.leaveService.UnapproveLeave(<LeaveApplication>this.form.value)
                        .subscribe(response=> {
                                    console.log('Unapprove Response');
                                    console.log(response.Message);
                                    console.log(response.ResponseData);
                                  },
                                  err=> {
                                    console.log('Error on Update:');
                                    console.log(err);
                                    });
                                    
    this.router.navigate(['/pages/leaves/pendingApprovalLeaves']);
    //this.location.back();
  }

  goBack(){
    this.location.back();
  }

  applyDateFormat(date) : any { 
    var raw = new Date(date);

    var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');      
    return formatted; 
  }
}



// const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
// one && two && two.year === one.year && two.month === one.month && two.day === one.day;

// const before = (one: NgbDateStruct, two: NgbDateStruct) =>
// !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
//   ? false : one.day < two.day : one.month < two.month : one.year < two.year;

// const after = (one: NgbDateStruct, two: NgbDateStruct) =>
// !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
//   ? false : one.day > two.day : one.month > two.month : one.year > two.year;