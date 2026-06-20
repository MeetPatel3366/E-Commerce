
import StarRating from "./StarRating";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import highlightText from "../utils/highlightText";
import type { Product } from "../Types/productTypes";
import { memo } from "react";

interface PropsTypes {
  item:Product;
  searchQuery:string;
  handleFavorite:(item:Product)=>void;
  isFavorite:boolean;
  setSelectedProduct:(item:Product)=>void;
  lengthFilteredProducts:number
}

const ProductCard = memo(({
  item,
  searchQuery,
  handleFavorite,
  isFavorite,
  setSelectedProduct,
  lengthFilteredProducts
}:PropsTypes) => {
    const handleFavoriteClick=()=>{
        handleFavorite(item)
    }

    const handleSelect=()=>{
        setSelectedProduct(item)
    }
  return (
    <div
      key={item.id}
      className={`bg-gray-50 p-2  rounded cursor-pointer dark:bg-gray-800 ${lengthFilteredProducts == 1 ? "max-w-[450px]" : ""}  h-[260px]`}
      onClick={handleSelect}
    >
      <div className="flex justify-between">
        <div className="pl-2 font-semibold">
          <div>{highlightText(item.title, searchQuery)}</div>
          <h2 className="text-purple-500">${item.price}</h2>
        </div>
        <div onClick={ handleFavoriteClick}>
          {/* {isFavorite(item?.id)  */}
          {isFavorite ? (
            <div>
              <MdOutlineFavorite />
            </div>
          ) : (
            <button>
              <MdOutlineFavoriteBorder />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col p-4 justify-center items-center">
        <img
          src={item?.thumbnail}
          alt="thumbnail"
          className="w-28 object-contain"
          loading="lazy"
        />
        <div className="flex gap-2 items-center">
          <StarRating rating={item?.rating} />({item?.reviews.length})
        </div>
      </div>
    </div>
  );
})

export default ProductCard;
