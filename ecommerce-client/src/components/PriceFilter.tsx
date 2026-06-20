interface PropsTypes {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}
const PriceFilter = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: PropsTypes) => {
  return (
    <div>
      <h3 className="pt-4 font-bold">Filter By: Price</h3>
      <div className="flex justify-between gap-2 px-2">
        <div>
          <label htmlFor="minPrice">Minimum Price</label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="minPrice"
            className="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="maxPrice">Maximum Price</label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="maxPrice"
            className="w-full rounded border p-2 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
