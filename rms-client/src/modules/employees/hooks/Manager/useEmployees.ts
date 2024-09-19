import { useState, useEffect } from 'react';

// Define the Employee interface
interface Employee {
  id: number;
  name: string;
  position: string;
}

// Custom hook for managing employees
const useEmployees = () => {
  // State to store employees data
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch or load employees data
    const fetchEmployees = async () => {
      try {
        // Simulate a delay for fetching data (e.g., for an API call)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock employee data
        const data: Employee[] = [
          { id: 1, name: 'Kaweesha Nethmina', position: 'Manager' },
          { id: 2, name: 'Kavindu Senanayake', position: 'Receptionist' },
          { id: 3, name: 'Pasindu Mahesh', position: 'Housekeeping' },
        ];

        setEmployees(data); // Update the employees state with fetched data
      } catch (err) {
        setError('Failed to fetch employees'); // Set error state if fetch fails
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchEmployees(); // Call the function to fetch employees data
  }, []);

  // Return employees data, loading state, and error state for use in components
  return { employees, loading, error };
};

export default useEmployees;
