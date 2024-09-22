import { useState } from 'react';

export const useSelectedButton = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (id: number) => {
    setSelectedButton(id);
  };

  return {
    selectedButton,
    handleButtonClick,
  };
};
