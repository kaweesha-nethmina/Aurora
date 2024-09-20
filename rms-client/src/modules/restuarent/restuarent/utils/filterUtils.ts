// src/utils/filterUtils.ts

import { MenuItem } from '../services/menuService';

export const filterMenuItems = (
  items: MenuItem[],
  category: string,
  searchTerm: string
): MenuItem[] => {
  return items.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });
};


