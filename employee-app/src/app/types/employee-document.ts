export interface EmployeeDocument {
  id: number;
  fullName: string;
  salary: number;
  email?: string;
  position: string;
  creationDate: Date;
}
