interface sortFilterProps {
  sortBy:
    | "default"
    | "plowToHigh"
    | "pHighToLow"
    | "rlowToHigh"
    | "rHighToLow"
    | "nameAtoZ"
    | "nameZtoA";
  setSortBy: (
    value:
      | "default"
      | "plowToHigh"
      | "pHighToLow"
      | "rlowToHigh"
      | "rHighToLow"
      | "nameAtoZ"
      | "nameZtoA",
  ) => void;
}

const SortFilter = ({ sortBy, setSortBy }: sortFilterProps) => {
  return (
    <div className="p-2">
      <h2 className="font-bold">Sort Filter</h2>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(
            e.target.value as
              | "default"
              | "plowToHigh"
              | "pHighToLow"
              | "rlowToHigh"
              | "rHighToLow"
              | "nameAtoZ"
              | "nameZtoA",
          )
        }
        className="w-full p-2 border p-2 rounded dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      >
        <option value="default">Default</option>
        <option value="plowToHigh">Price Low &rarr; High</option>
        <option value="pHighToLow">Price High &rarr; Low</option>
        <option value="rlowToHigh">Rating Low &rarr; High</option>
        <option value="rHighToLow">Rating High &rarr; Low</option>
        <option value="nameAtoZ">Name A &rarr; Z</option>
        <option value="nameZtoA">Name Z &rarr; A</option>
      </select>
    </div>
  );
};

export default SortFilter;
