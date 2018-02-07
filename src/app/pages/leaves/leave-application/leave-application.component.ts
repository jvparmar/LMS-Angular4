import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LeaveDetails, LeaveApplication } from '../../../@core/data-model/index';
import { ActivatedRoute, Router } from '@angular/router';
//import { LeaveService } from 'app/_services/index';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operator/delay';
//import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { LeaveService } from '../../../@core/data/index';
import { enumLeaveStatus } from '../../../@core/utils/index';
import { NgbDateISOParserFormatter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { DatePipe } from '@angular/common';
//import { enumLeaveStatus } from '../app/pages/LMS-constants';

@Component({
    selector: 'app-leave-application',
    templateUrl: './leave-application.component.html',
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
  export class LeaveApplicationComponent implements OnInit {
    form:FormGroup;
    EmployeeLeaveId: AbstractControl;
    RequestDate: AbstractControl;
    LeaveFromDate:AbstractControl;
    LeaveToDate:AbstractControl;
    LeaveTypeDescription: AbstractControl;
    NoOfDays: AbstractControl;
    LeaveStatusDescription: AbstractControl;
    Description: AbstractControl;
    //DateRange: AbstractControl;
  
    leaveApplication : LeaveApplication;
  
    private sub: any;
    //public formMode;  
    model;
  
    hoveredDate: NgbDateStruct;
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
  
    employeeId: number = 1;
    isEditMode: boolean = false;
    isAllowToSave: boolean = true;
    isAllowToWithdraw: boolean = false;
    pEmployeeLeaveId: string;
    valRequestDate: Date;
    
    constructor(private fb: FormBuilder,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private leaveService: LeaveService,
        calendar: NgbCalendar,
        private _parserFormatter: NgbDateParserFormatter,
        private datePipe: DatePipe
        ) 
    { 
        //const pEmployeeLeaveId = this.route.snapshot.paramMap.get('id');
        this.pEmployeeLeaveId = this.route.snapshot.paramMap.get('id');
        
        console.log('Constructor Employee Leave Id : ' + parseInt(this.pEmployeeLeaveId));
        
        if(isNaN(parseInt(this.pEmployeeLeaveId))){
          //this.formMode = "NEW";
          this.isEditMode = false;
        }
        else{
          //this.formMode = "EDIT";
          this.isEditMode = true;
        }
        
        // //************ DATE PICKER */
        // this.fromDate = calendar.getToday();
        // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }
    
    ngOnInit() {    
    this.buildForm();
    // setTimeout(() => {
    //   this.leaveService.getEmployeeLeaveDetails(1).subscribe((response : LeaveApplication) => {
    //     console.log('Employee Leave details ' + response);
    //   }, err=> {
    //     console.log('Service called Error : ' + err)
    //   });
    // }, 1000);
    
    }

    buildForm() {
        this.form = this.fb.group({
          'EmployeeLeaveId': ['', Validators.required],
          'RequestDate': [],
          'LeaveFromDate': ['', Validators.compose([Validators.required])],
          'LeaveToDate': ['', Validators.compose([Validators.required])],
          'LeaveTypeDescription': ['',Validators.compose([Validators.required])],
          'NoOfDays':['', Validators.compose([Validators.required])],
          'LeaveStatusDescription': [''],
          'Description': [''],
          //'DateRange': ['']
         });
    
         this.EmployeeLeaveId = this.form.controls['EmployeeLeaveId'];
         this.RequestDate = this.form.controls['RequestDate'];
         this.LeaveFromDate = this.form.controls['LeaveFromDate'];
         this.LeaveToDate = this.form.controls['LeaveToDate'];
         this.LeaveTypeDescription = this.form.controls['LeaveTypeDescription'];
         this.NoOfDays = this.form.controls['NoOfDays'];
         this.LeaveStatusDescription = this.form.controls['LeaveStatusDescription'];
         this.Description = this.form.controls['Description'];
         //this.DateRange = this.form.controls['DateRange'];
    
         this.form.controls['LeaveFromDate'].valueChanges.subscribe( data => {
          //console.log("CAMBIOSS ", data);
          if(!data || (typeof data === 'string' && data.length == 0)) {
            //console.log('To Date selection :' + data);
            this.form.patchValue({
                LeaveFromDate: null
            }, {emitEvent: false});
          }
        });

        this.form.controls['LeaveToDate'].valueChanges.subscribe( data => {
            //console.log("CAMBIOSS ", data);
            if(!data || (typeof data === 'string' && data.length == 0)) {
              //console.log('To Date selection :' + data);
              this.form.patchValue({
                  LeaveToDate: null
              }, {emitEvent: false});
            }
          });

          if(!this.isEditMode) {
            console.log('New Leave request');
            this.form.setValue({
              EmployeeLeaveId: 0,
              RequestDate: this.applyDateFormat(Date.now()),
              LeaveFromDate: '',
              LeaveToDate: '',
              LeaveTypeDescription: '',
              NoOfDays: 0,
              LeaveStatusDescription: '',
              Description: '',
              //DateRange:''
            })
          }
          else {
            this.sub = this.route.params
            .delay(1000)
            .map(params=>params['id'])
            .switchMap(id=>this.leaveService.getEmployeeLeaveDetails(parseInt(id)))
            .subscribe((response: LeaveApplication) => { 
                      // console.log('Leave Application Leave From : ' + response.LeaveFromDate);                      
                      // console.log('Leave Application Request Date : ' + response.RequestDate);
                      this.valRequestDate = this.applyDateFormat(response.RequestDate);

                      this.form.setValue({
                        EmployeeLeaveId: response.EmployeeLeaveId,
                        RequestDate: this._parserFormatter.parse(response.RequestDate.toString()),                        
                        LeaveFromDate: this._parserFormatter.parse(response.LeaveFromDate.toString()),                  
                        LeaveToDate: this._parserFormatter.parse(response.LeaveToDate.toString()),
                        LeaveTypeDescription: response.LeaveTypeDescription,
                        NoOfDays: response.NoOfDays,
                        LeaveStatusDescription: response.LeaveStatusDescription,
                        Description: response.Description
                      });
      
                      //console.log('Constant : ' + enumLeaveStatus.Applied);
                      //console.log('Constant : ' + enumLeaveStatus[enumLeaveStatus.Applied]);
      
                      //if(this.form.controls['LeaveStatusDescription'].value == "Approved"){
                      if(this.form.controls['LeaveStatusDescription'].value == enumLeaveStatus[enumLeaveStatus.Applied]){
                        this.isAllowToSave = true;
                        this.isAllowToWithdraw = true;
                        //console.log('Read only: ' + this.isLeaveApproved );
                        //var fieldElement = <HTMLInputElement>document.getElementById('dpLeaveFromDate');
                        //fieldElement.readOnly = true;
                        //this.form.controls['LeaveFromDate'].disable();
                      }
                      else if(this.form.controls['LeaveStatusDescription'].value == enumLeaveStatus[enumLeaveStatus.Approved]) {
                        this.isAllowToSave = false;
                        this.isAllowToWithdraw = true;
                      }
                      else
                        this.isAllowToSave = false;
                      
            }, 
            err=> {
              console.log('Service called Error : ' + err)
            });      
          }
  }

  onSubmit() {        
    console.log('Using Date Parser : ' + this._parserFormatter.format(this.form.controls['LeaveFromDate'].value));
    this.form.controls['LeaveFromDate'].patchValue(this._parserFormatter.format(this.form.controls['LeaveFromDate'].value));
    this.form.controls['LeaveToDate'].patchValue(this._parserFormatter.format(this.form.controls['LeaveToDate'].value));

    //this.form.controls['LeaveFromDate'].patchValue(this._parserFormatter.format(this.form.controls['LeaveFromDate'].value))

    console.log(this.form.value);

    var requestData = new LeaveApplication;    
    requestData = <LeaveApplication>this.form.value;
    console.log(requestData);

    // if(this.form.invalid){
    //   //alert('Missing Data');
    //   console.log('Missing Data...');
    //   return;
    // }

    requestData.EmployeeId = this.employeeId;
    requestData.LeaveStatusUpdatedBy = this.employeeId;

    //console.log(<LeaveApplication>this.form.value);
    //console.log(requestData);

    if(this.isEditMode){
      this.leaveService.UpdateaAppliedForLeave(<LeaveApplication>this.form.value)
                        .subscribe(response=> console.log(response.Message),
                                  err=> console.log('Error on Update:' + err));
    }
    else{
      this.leaveService.ApplyForLeave(<LeaveApplication>this.form.value)
                        .subscribe(response=> console.log(response),
                                  err=> console.log('Error on Update:' + err));
    }

    //this.router.navigate(['']);
    this.location.back();
  }

  onWithdraw(){
    console.log('Withdraw clicked...');
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



const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day > two.day : one.month > two.month : one.year > two.year;