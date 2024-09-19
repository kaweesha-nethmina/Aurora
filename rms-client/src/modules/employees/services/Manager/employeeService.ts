// services/Manager/employeeService.ts

export const createEmployee = async (employeeData: any) => {
  const response = await fetch('http://localhost:5000/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
