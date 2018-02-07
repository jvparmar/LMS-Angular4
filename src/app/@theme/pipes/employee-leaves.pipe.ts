import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'employeeLeaves' })
export class EmployeeLeavesPipe implements PipeTransform {
  transform(leaves: string): string[] {
    return leaves.split(' | ');
  }
}




