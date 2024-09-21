import '../OffersHome/CategorySelector.css';

interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = ['All', 'Restaurant', 'Spa', 'Event', 'Packages'];

const CategorySelector = ({ selectedCategory, setSelectedCategory }: CategorySelectorProps) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="category-selector"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
