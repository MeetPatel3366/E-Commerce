import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="p-4">
      <div className="flex items-center border rounded-lg px-3 bg-white dark:bg-gray-800 dark:border-gray-600">
        <FiSearch />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
