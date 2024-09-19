import React from 'react';

interface DrinksSearchProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const DrinksSearch: React.FC<DrinksSearchProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="drinks-search">
            <input
                type="text"
                placeholder="Search drinks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default DrinksSearch;
