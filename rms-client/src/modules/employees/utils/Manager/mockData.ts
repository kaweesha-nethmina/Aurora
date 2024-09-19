// utils/mockData.ts

// Define TypeScript interfaces
export interface Employee {
    id: number;
    name: string;
    position: string;
  }
  
  export interface AttendanceData {
    id: number;
    name: string;
    dates: { [date: string]: string }; // Index signature to allow string keys
  }
  
  // Mock data for employees
  export const fetchEmployees = async (): Promise<Employee[]> => {
    // Mock fetch call
    return [
      { id: 1, name: 'Kaweesha Nethmina', position: 'Manager' },
      { id: 2, name: 'Kavindu senanayake', position: 'Receptionist' },
      { id: 3, name: 'Pasindu Mahesh', position: 'Housekeeping' },
    ];
  };
  
  // Mock data for attendance
  export const attendanceData: AttendanceData[] = [
    { id: 1, name: 'Kaweesha Nethmina', dates: { '2024-08-01': 'Present', '2024-08-02': 'Absent', '2024-08-03': 'Present', '2024-08-04': 'Leave' } },
    { id: 2, name: 'Kavindu Senanayake', dates: { '2024-08-01': 'Present', '2024-08-02': 'Present', '2024-08-03': 'Present', '2024-08-04': 'Present' } },
    { id: 3, name: 'Pasindu mahesh', dates: { '2024-08-01': 'Absent', '2024-08-02': 'Leave', '2024-08-03': 'Present', '2024-08-04': 'Present' } },
  ];
  