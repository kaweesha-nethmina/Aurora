// types/DutyRoasterEntry.ts
export interface DutyRoasterEntry {
    _id: string;          // Unique identifier
    date: string;         // Date of the duty
    employeeName: string; // Full name of the employee
    shift: 'Morning' | 'Evening' | 'Night'; // Shift type
}
