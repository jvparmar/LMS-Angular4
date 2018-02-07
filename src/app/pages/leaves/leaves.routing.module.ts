import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeavesComponent } from './leaves.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { MyLeaveLogsComponent } from './my-leave-logs/my-leave-logs.component';
import { PendingApprovalLeavesComponent } from './pending-for-approval/pending-aproval.component';
import { MyLeavesTabsComponent } from './my-leaves/my-leaves-tabs.component';
import { ApproveLeaveApplicationComponent } from './approve-leave/approve-leave.component';


const routes: Routes = [{
  path: '',
  component: LeavesComponent,
  children: [{
              path: '',
              component: MyLeavesTabsComponent,
              children:[{                
                  path: '',
                  redirectTo: 'myLeaves',
                  pathMatch: 'full',
                }, {
                  path: 'myLeaves',
                  component: MyLeavesComponent,
                }, {
                  path: 'pendingApprovalLeaves',
                  component: PendingApprovalLeavesComponent,
              }]              
            },{
            //   path: 'myLeaves',
            //   component: MyLeavesComponent
            // }, {
            //   path: 'pendingApprovalLeaves',
            //   component: PendingApprovalLeavesComponent,
            // }, {
              path: 'approveLeave/:id',
              component: ApproveLeaveApplicationComponent,
            }, {
              path: 'leaveApplication',
              component: LeaveApplicationComponent
            }, {
              path: 'leaveApplication/edit/:id',
              component: LeaveApplicationComponent
        }],  
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
    PendingApprovalLeavesComponent,
    MyLeavesTabsComponent,
    ApproveLeaveApplicationComponent,
];
