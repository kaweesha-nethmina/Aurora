// Define the AttendanceData interface
export interface AttendanceData {
    id: number;
    name: string;
    dates: { [date: string]: string }; // Index signature to allow string keys
  }
  
  // Mock attendance data
  export const attendanceData: AttendanceData[] = [
    { id: 1, name: 'Kaweesha Nethmina', dates: { '2024-08-01': 'Present', '2024-08-02': 'Absent', '2024-08-03': 'Present', '2024-08-04': 'Leave' } },
    { id: 2, name: 'Kavindu senanayake', dates: { '2024-08-01': 'Present', '2024-08-02': 'Present', '2024-08-03': 'Present', '2024-08-04': 'Present' } },
    { id: 3, name: 'pasindu mahesh', dates: { '2024-08-01': 'Absent', '2024-08-02': 'Leave', '2024-08-03': 'Present', '2024-08-04': 'Present' } },
  ];
  