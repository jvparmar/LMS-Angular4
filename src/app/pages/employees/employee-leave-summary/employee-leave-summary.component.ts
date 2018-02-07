import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-employee-leave-summary-card',
  styleUrls: ['./employee-leave-summary.component.scss'],
  template: `
    <nb-card [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ details }}</div>
      </div>
    </nb-card>
  `,
})
export class EmployeeLeaveSummaryCardComponent {
//<nb-card (click)="on = !on" [ngClass]="{'off': !on}">
  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() details: string;
}
