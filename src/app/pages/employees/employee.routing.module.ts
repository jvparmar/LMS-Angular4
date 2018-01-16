import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employee.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
// import { LeavesComponent } from './leaves.component';
// import { MyLeavesComponent } from './my-leaves/my-leaves.component';
// import { LeaveApplicationComponent } from './leave-application/leave-application.component';
// import { MyLeaveLogsComponent } from './my-leave-logs/my-leave-logs.component';


const routes: Routes = [{
  path: '',
  component: EmployeesComponent,
  children: [{
    path: 'list',
    component: EmployeeListComponent
    }, {
    path: 'new',
    component: EmployeeFormComponent
    }],  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule { }

export const routedComponents = [  
    EmployeesComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    //EmployeeLeavesComponent,    
//   DepartmentListComponent,
//   DepartmentFormComponent
];
