export interface IDepartmentList {
    DepartmentId: number;
    DepartmentCode: string;
    DepartmentName: string;
    IsActive: boolean;
    Status: string;
    EmployeeCount: number;
}


export class Department {
    DepartmentId: number;
    DepartmentCode: string;
    DepartmentName: string;
    IsActive: boolean;    
}

