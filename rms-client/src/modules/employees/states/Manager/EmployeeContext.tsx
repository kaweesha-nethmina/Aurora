import React, { createContext, useContext, useState, ReactNode } from 'react';

const EmployeeContext = createContext<any>(null);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
