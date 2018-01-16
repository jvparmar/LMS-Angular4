import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../@core/data/index';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss']
})
export class EmployeeLeavesComponent implements OnInit {

  employeeLeaveData;
  employeeITLeaveData;
  employeeDGLeaveData;
  employeeDSLeaveData;
  employeeHRLeaveData
  headerData;

  constructor(private service: EmployeeService) {
    this.service.getEmployeeLeaves()
                .then((data) => {
                      console.log(data);
                      this.employeeLeaveData = data;
                      //console.log(this.employeeLeaveData[0].WeekDates);
                      this.headerData = this.employeeLeaveData[0].WeekDates;
                      this.employeeITLeaveData = data.filter(p => p.Department == 'IT');
                      this.employeeDGLeaveData = data.filter(p => p.Department == 'DG');
                      this.employeeDSLeaveData = data.filter(p => p.Department == 'DG');
                      this.employeeHRLeaveData = data.filter(p => p.Department == 'HR' )
    });

    
   }

  ngOnInit() {

    //console.log(this.employeeLeaveData);
    // this.headerData = this.employeeLeaveData.WeekDates;
    //console.log(this.headerData);
  }
}
