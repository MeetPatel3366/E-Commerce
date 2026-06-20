interface PropsType {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryList = ({
  categories,
  selectedCategory,
  onSelect,
}: PropsType) => {
  return (
    <div className="px-4">
      <h2 className="font-bold text-xl">Categories</h2>
      {categories && (
        <div className="h-64 overflow-y-auto">
          {categories.map((category: string, idx: number) => {
            return (
              <button
                key={idx}
                onClick={() => onSelect(category)}
                className={`w-full text-left ${selectedCategory == category ? "text-purple-400" : ""}`}
              >
                {category[0].toUpperCase() + category.slice(1, category.length)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
