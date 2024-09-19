import React from 'react';

interface DrinksFilterProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const DrinksFilter: React.FC<DrinksFilterProps> = ({ selectedCategory, setSelectedCategory }) => {
    const categories = ['All', 'Drinks', 'Non-Alcoholic', 'Alcoholic'];

    return (
        <div className="drinks-filter">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DrinksFilter;
