import { useState } from 'react';

const useFilter = () => {
  const [selectedType, setSelectedType] = useState('');

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  return { selectedType, handleFilter };
};

export default useFilter;
