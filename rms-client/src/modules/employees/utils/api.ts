// src/utils/api.ts
const API_URL = import.meta.env.VITE_API_URL;

interface Employee {
  EmployeeID: number;
  Name: string;
  Position: string;
  Department: string;
  Contact_Info: string;
  Hire_Date: Date;
  Username: string;
  Password: string;
  Email: string;
}

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch(`${API_URL}/api/employees`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
