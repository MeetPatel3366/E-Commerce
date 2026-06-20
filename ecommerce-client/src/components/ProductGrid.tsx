import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { Product } from "../Types/productTypes";
import StarRating from "./StarRating";
import { toggleFavourite } from "../features/favouriteSlice";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import highlightText from "../utils/highlightText";
import { useCallback, useMemo } from "react";
import ProductCard from "./ProductCard";

interface PropsType {
  filteredProducts: Product[];
  setSelectedProduct: (item: Product | null) => void;
  searchQuery: string;
}

const ProductGrid = ({
  filteredProducts,
  setSelectedProduct,
  searchQuery,
}: PropsType) => {
  // const { searchQuery } = useAppSelector((state) => state.products);
  const favoriteItems = useAppSelector((state) => state.favourite);
  const dispatch = useAppDispatch();

  // const isFavorite = (productId: number) => {
  //   return favoriteItems.some((favItem) => favItem.id == productId);
  // };
  const favoriteIds = useMemo(
    () => new Set(favoriteItems.map((item) => item.id)),
    [favoriteItems],
  );

  const handleFavorite = useCallback(
    (product: Product) => {
      dispatch(toggleFavourite(product));
    },
    [dispatch],
  );
  return (
    //  <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 text-black dark:text-white">
    <>
      {/* {filteredProducts.length==0 && (
    <div className="flex text-2xl font-bold justify-between w-full">
    <h3>No Product Found</h3>
   </div>
   )} */}

      <div
        className={` grid gap-3 w-full ${filteredProducts.length == 1 ? "grid-cols-1" : "[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))]"}`}
      >
        {filteredProducts.map((item) => {
          return (
           <ProductCard key={item.id} item={item} searchQuery={searchQuery} handleFavorite={handleFavorite} isFavorite={favoriteIds.has(item.id)} setSelectedProduct={setSelectedProduct} lengthFilteredProducts={filteredProducts.length}/>
          );
        })}
      </div>
    </>
  );
};

export default ProductGrid;
