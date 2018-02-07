import { Component } from '@angular/core';

@Component({
    selector: 'ngx-my-leaves-tabs',
    //styleUrls: ['./tabs.component.scss'],
    //templateUrl: './tabs.component.html',
    template: `
        <nb-card size="small">
            <nb-route-tabset [tabs]="tabLeaves"></nb-route-tabset>
        </nb-card>
    `
  })
  export class MyLeavesTabsComponent {
  
    tabLeaves: any[] = [
        {
            title: 'My Leaves',
            route: '/pages/leaves/myLeaves',
        },
        {
            title: 'Pending Approval Leaves',
            route: '/pages/leaves/pendingApprovalLeaves',
        },
    ];
  }
  