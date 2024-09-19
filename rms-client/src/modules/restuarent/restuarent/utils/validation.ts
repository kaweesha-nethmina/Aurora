// Path: restaurant/utils/validation.ts

export const validateMenuItem = (name: string, price: number, description: string, foodCode: string): string | null => {
    if (!name || name.trim() === '') return 'Name is required';
    if (!price || price <= 0) return 'Price must be greater than zero';
    if (!description || description.trim() === '') return 'Description is required';
    if (!foodCode || foodCode.trim() === '') return 'Food code is required';
    return null;
  };
  