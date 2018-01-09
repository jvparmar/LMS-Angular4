export class LeaveApplication {
    // constructor(){
    //     this.EmployeeLeaveId = 0;
    //     this.RequestDate = null;
    //     this.LeaveFromDate = null;
    //     this.LeaveToDate = null;
    //     this.LeaveTypeCode = '';
    //     this.LeaveTypeDescription = '';
    //     this.LeaveStatusCode = '';
    //     this.LeaveStatusDescription = '';
    //     this.NumberOfDays = 0;
    //     this.Description = '';
    
    //     this.EmployeeId = 0;
    //     this.EmployeeCode = '';
    //     this.EmployeeFullName = '';
    //     this.Email = '';
    //     this.DepartmentCode = '';
    //     this.DepartmentName = '';
    // }


    EmployeeLeaveId : number;
    RequestDate : Date;    
    LeaveFromDate : Date;
    LeaveToDate : Date;
    LeaveTypeCode: string;
    LeaveTypeDescription : string;
    LeaveStatusCode: string;
    LeaveStatusDescription : string;    
    LeaveStatusUpdatedBy: number;
    NoOfDays : number;
    Description : string;

    EmployeeId : number;
    EmployeeCode : string;
    EmployeeFullName : string;
    Email : string;
    DepartmentCode : string;
    DepartmentName : string;
}

export class EmployeeLeaveList {
     EmployeeId : number;
     EmployeeCode : string;
     EmployeeFullName : string;
     Email : string;
     DepartmentCode : string;
     DepartmentName : string;

     EmployeeLeaves: LeaveDetails[];
}

export class LeaveDetails
{
     EmployeeLeaveId : number;
     RequestDate : Date;
     LeaveFromDate : Date;
     LeaveToDate : Date;
     LeaveTypeCode : string;
     LeaveTypeDescription : string;
     LeaveStatusCode : string;
     LeaveStatusDescription : string;
     NoOfDays : number;
     Description : string;
}

export class EmployeeLeaveLog {
    EmployeeLeaveLogId: number;
    EmployeeLeaveId : number;
    LeaveStatusCode : string;
    LeaveStatusDescription : string;
    LeaveStatusOn: Date;
    Remarks : string;
    LeaveStatusUpdatedBy: string;
    BalanceLeave: number;
}


