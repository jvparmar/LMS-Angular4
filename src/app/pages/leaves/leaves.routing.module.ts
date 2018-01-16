import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeavesComponent } from './leaves.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { MyLeaveLogsComponent } from './my-leave-logs/my-leave-logs.component';


const routes: Routes = [{
  path: '',
  component: LeavesComponent,
  children: [{
    path: 'myLeaves',
    component: MyLeavesComponent
    }, {
    path: 'leaveApplication',
    component: LeaveApplicationComponent
    }, {
      path: 'leaveApplication/edit/:id',
      component: LeaveApplicationComponent
    }
],  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesRoutingModule { }

export const routedComponents = [  
    LeavesComponent,
    MyLeavesComponent,
    LeaveApplicationComponent,
    MyLeaveLogsComponent,
//   DepartmentListComponent,
//   DepartmentFormComponent
];
