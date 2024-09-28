import { useEffect, useState } from 'react';

interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    // Add other relevant fields as necessary
}

const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/employees');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data: Employee[] = await response.json();
                setEmployees(data);
            } catch (err) {
                const errorMessage = (err as Error).message; // Type assertion
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return { employees, loading, error };
};

export default useEmployees;
