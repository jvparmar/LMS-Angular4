import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService, AlertService, AuthenticationService, DashboardService } from '../../../@core/data/index';
//import { LMSDateFormatPipe } from '../../../@core/utils/date-format-pipe';
import { NbThemeService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { LMS_MONTHLY_DATE_FORMAT, LMS_WEEKLY_DATE_FORMAT } from '../../../@core/utils/index';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss']
})
export class EmployeeLeavesComponent implements OnInit {
  type = 'week';
  types = ['week', 'month'];

  currentTheme: string;
  themeSubscription: any;
  data;
  dataEmployeeLeaveSummary;

  employeeLeaveData;
  employeeITLeaveData;
  employeeDGLeaveData;
  employeeDSLeaveData;
  employeeHRLeaveData
  headerData;

  totalAbsentInIT = 0;
  weekHeaderData: any[] = [];
  current;
  currentDate;
  today;
  todayIndex;

  valTotalEmployees;
  valTotalOnLeave;
  valTotalOnLeaveToday;
  employeeId;

  TOTAL_APPLIED;
  TOTAL_APPROVED;
  TOTAL_UNAPPROVED;
  TOTAL_WITHDRAW;
  TOTAL_SUBMITTED_LEAVE_APPLICATION;
  TOTAL_BALANCE;

  constructor(private employeeService: EmployeeService, 
              private themeService: NbThemeService,
              private alterService: AlertService,
              private dashboardService: DashboardService,
              private authService: AuthenticationService,
              private datePipe: DatePipe ) {
            
            this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
                this.currentTheme = theme.name;
            });
        
            //this.prepareHeaderData();
            
            this.currentDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
            //alert(this.currentDate);
            this.employeeId = this.authService.userId;
            //console.log('Current: ' + new Date());
            console.log('1) Constructor called...');
   }

  ngOnInit() {
    // this.employeeService.getEmployeeLeaves()
    //             .then((data) => {
    //                   console.log(data);
    //                   this.prepareData(data);
    // });

    //this.getWeeklyEmployeeLeaves(this.currentDate);
    //this.getWeeklyEmployeeLeaves('2017-12-26');
    //this.valTotalOnLeaveToday = 0;
    console.log('2) OnInit called...');
    this.onPeriodSelection(this.type);
    this.getEmployeeLeaveSummary();
  }

  getEmployeeLeaveSummary(){
    this.dashboardService.getEmployeeLeaveSummary(this.employeeId)
                        .then(result => {
                          this.dataEmployeeLeaveSummary = result.json();
                          console.log(this.dataEmployeeLeaveSummary);
                          this.TOTAL_APPLIED = this.dataEmployeeLeaveSummary.filter(l => l.SummaryCode == 'APPLIED')[0].SummaryCount;
                          this.TOTAL_APPROVED = this.dataEmployeeLeaveSummary.filter(l => l.SummaryCode == 'APPROVED')[0].SummaryCount;
                          this.TOTAL_UNAPPROVED = this.dataEmployeeLeaveSummary.filter(l => l.SummaryCode == 'UNAPPROVED')[0].SummaryCount;
                          this.TOTAL_WITHDRAW = this.dataEmployeeLeaveSummary.filter(l => l.SummaryCode == 'WITHDREW')[0].SummaryCount;
                          this.TOTAL_SUBMITTED_LEAVE_APPLICATION = this.dataEmployeeLeaveSummary.filter(l => l.SummaryCode == 'TOTAL')[0].SummaryCount;
                          this.TOTAL_BALANCE = this.dataEmployeeLeaveSummary.filter(l => l.SummaryCode == 'BALANCE')[0].SummaryCount;
                        })
                        .catch(error => {
                          if(error.status == 401) {
                            this.alterService.showErrorAsync(error.json());
                            //this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/pages/departments/list' }});  
                          }
                          //this.alterService.showErrorAsync(e.json());
                          console.log(error);
                        })
  }

  async getWeeklyEmployeeLeaves(date){
    await this.employeeService.getWeeklyEmployeeLeavesAsync(date)
                .then(result => { this.data = result.json(); 
                                  //console.log(result.json());
                                  this.prepareData(this.data);
                                  //this.source.load(result.json()); 
                                })
                .catch(e => {
                    if(e.status == 401) {
                      this.alterService.showErrorAsync(e.json());
                      //this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/pages/departments/list' }});  
                    }
                    //this.alterService.showErrorAsync(e.json());
                    console.log(e)
                  });
  }

  async getMonthlyEmployeeLeaves(date){
    await this.employeeService.getMonthlyEmployeeLeavesAsync(date)
                              .then( result=>{
                                this.data = result.json();
                                this.prepareData(this.data);
                              })
                              .catch(e => {
                                if(e.status == 401) {
                                  this.alterService.showErrorAsync(e.json());
                                  //this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/pages/departments/list' }});  
                                }
                                //this.alterService.showErrorAsync(e.json());
                                console.log(e)
                              });
  }

  onPeriodSelection(t){
    console.log('3) onPeriodSelection called...');
    this.type = t;
    //console.log(this.type);
    this.prepareHeaderData();
    if(t == 'week'){      
      //this.getWeeklyEmployeeLeaves('2017-12-26');
      this.getWeeklyEmployeeLeaves(this.currentDate);
    }
    else{
      this.getMonthlyEmployeeLeaves(this.currentDate);
    }    
  }

  onSelectChange(event) {
    if(this.employeeLeaveData == null){
      return;
    }
    var search = / \| /g;

    if(event.tabTitle == 'All') {
      this.valTotalEmployees = this.employeeLeaveData.length;
      this.valTotalOnLeave = this.employeeLeaveData.filter(p => p.Leaves.replace(search, "").trim()).length;
      this.calOnLeaveToday(this.employeeLeaveData);
      //console.log('ALL is selected!');
    } else if (event.tabTitle == 'IT') {
      this.valTotalEmployees = this.employeeITLeaveData.length;
      this.valTotalOnLeave = this.employeeITLeaveData.filter(p => p.Leaves.replace(search, "").trim()).length;
      this.calOnLeaveToday(this.employeeITLeaveData);
      //console.log('IT is selected!')
    } else if (event.tabTitle == 'DG') {
      this.valTotalEmployees = this.employeeDGLeaveData.length;
      this.valTotalOnLeave = this.employeeDGLeaveData.filter(p => p.Leaves.replace(search, "").trim()).length;
      this.calOnLeaveToday(this.employeeDGLeaveData);
      //console.log('DG is selected!')
    } else if (event.tabTitle == 'DS') {
      this.valTotalEmployees = this.employeeDSLeaveData.length;
      this.valTotalOnLeave = this.employeeDSLeaveData.filter(p => p.Leaves.replace(search, "").trim()).length;
      this.calOnLeaveToday(this.employeeDSLeaveData);
      //console.log('DS is selected!')
    } else if (event.tabTitle == 'HR') {
      this.valTotalEmployees = this.employeeHRLeaveData.length;
      this.valTotalOnLeave = this.employeeHRLeaveData.filter(p => p.Leaves.replace(search, "").trim()).length;
      this.calOnLeaveToday(this.employeeHRLeaveData);
      //console.log('HR is selected!')
    }
  }

  prepareData(data){
    console.log('5) prepareData called...');
    this.employeeLeaveData = data;
    //this.headerData = this.employeeLeaveData[0].WeekDates;
    this.employeeITLeaveData = data.filter(p => p.DepartmentCode == 'IT');
    this.employeeDGLeaveData = data.filter(p => p.DepartmentCode == 'DG');
    this.employeeDSLeaveData = data.filter(p => p.DepartmentCode == 'DS');
    this.employeeHRLeaveData = data.filter(p => p.DepartmentCode == 'HR' );

    // var myObj = [
    //   {
    //       "EmployeeId": 1,
    //       "FirstName": "Jignesh",
    //       "LastName": "Parmar",
    //       "Leaves": "  |  |  |  |  |  | ",
    //       "DepartmentCode": "IT"
    //   },
    //   {
    //       "EmployeeId": 2,
    //       "FirstName": "Rohit",
    //       "LastName": "Parmar",
    //       "Leaves": "  |  |  | AM |  |  | ",
    //       "DepartmentCode": "DG"
    //   },
    //   {
    //       "EmployeeId": 3,
    //       "FirstName": "Fenwick",
    //       "LastName": "Tang",
    //       "Leaves": "  |  |  |  |  |  | ",
    //       "DepartmentCode": "IT"
    //   }
    // ];

    // var test = [{name : "jack", sex: "F"}, {name: "joe", sex: "M"}]
    // var result = test.some(function(person) { 
    //                             return person.hasOwnProperty("name") && person["name"] === 'jack1' ;
    //                       });
    // console.log('RESULT: ' + result);
    
    // var d = myObj.filter(p => p.DepartmentCode == 'IT');
    var search = / \| /g;
    // d.forEach(function(leave){
    //   console.log('Leaves...');
    //   var newstr = leave.Leaves.replace(re, "").trim();
    //   console.log(newstr);    
    // })
    // console.log('IT LEAVES: ' + d.length);
    //console.log('LEAVES Total: ' + this.employeeLeaveData.filter(p => p.DepartmentCode == 'IT' && p.Leaves.replace(search, "").trim()).length);


    // var d = myObj.forEach(function(leave){
    //   var leaves = leave.Leaves.split(' | ').findIndex(3).toString()
    // })

    this.valTotalEmployees = this.employeeLeaveData.length;
    this.valTotalOnLeave = this.employeeLeaveData.filter(p => p.Leaves.replace(search, "").trim()).length;
    
    this.calOnLeaveToday(this.employeeLeaveData);
  }

  calOnLeaveToday(data){
    console.log('6) calOnLeaveToday called...');
    this.valTotalOnLeaveToday = 0;
    data.forEach(item => {
      //console.log('Today Index : ' + this.todayIndex);
      if(item.Leaves.split(' | ')[this.todayIndex].trim() != '')
        this.valTotalOnLeaveToday = this.valTotalOnLeaveToday + 1;
    });
  }


  prepareHeaderData(){
    console.log('4) prepareHeaderData called...');
    this.weekHeaderData = [];
    this.todayIndex = 0;
    var isTodayMatch = false;
    var month = new Date().getMonth() + 1;  
    var year = new Date().getFullYear();  

    this.today = this.applyDateFormat(month + '-' + new Date().getDate() + '-' + year);

    if(this.type=='week') {
      this.current = new Date();     // get current date    
      var weekstart = this.current.getDate() - this.current.getDay() + 1;    
      var weekend = weekstart + 6;       // end day is the first day + 6 
      // console.log('Weekstart: ' + weekstart);
      // console.log('weekend: ' + weekend);
      var monday = new Date(this.current.setDate(weekstart));  
      // var sunday = new Date(this.current.setDate(weekend));
      // console.log('monday: ' + monday.toLocaleString());
      // console.log('sunday' + sunday);       
      //this.totalAbsentInIT = this.employeeITLeaveData;
      //console.log(this.employeeITLeaveData.length);      
      // //this.current = new Date().toString();
      // var month = new Date().getMonth() + 1;  
      // var year = new Date().getFullYear(); 
      
      while(weekstart <= weekend) {     
        monday = new Date(new Date().setDate(weekstart));  
        //console.log('Week Days: ' + this.applyDateFormat(monday));
        monday = this.applyDateFormat(monday);
        if(!isTodayMatch) {
          if(monday != this.today) {
            this.todayIndex = this.todayIndex + 1;
          }
          else {
            isTodayMatch = true;
          }
        }
        //this.weekHeaderData.push(this.applyDateFormat(monday));                
        this.weekHeaderData.push(monday);
        weekstart = weekstart + 1;
      }
    }
    else {
      var today = new Date();
      var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
      //console.log('Last day of month:' + lastDayOfMonth);
      var day = 1;
      //var month = new Date().getMonth() + 1;
      //var year = new Date().getFullYear();

      while(day <= lastDayOfMonth) {
        //var day = day;
        if(!isTodayMatch) {
          if(day != this.today) {
            this.todayIndex = this.todayIndex + 1;
            //this.todayIndex = 14;
          }
          else {
            isTodayMatch = true;
          }
        }
        this.weekHeaderData.push(this.applyDateFormat(month + '-' + day + '-' + year));
        day = day + 1;
      }
    }    
  }

  applyDateFormat(date) : any { 
    //console.log('Apply Date Format:');
    //console.log(date);
    var raw = new Date(date);
    

    if(this.type == 'week'){
      var formatted = this.datePipe.transform(raw, LMS_WEEKLY_DATE_FORMAT);
    }
    else{
      var formatted = this.datePipe.transform(raw, LMS_MONTHLY_DATE_FORMAT);
    }
    
    return formatted; 
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}

