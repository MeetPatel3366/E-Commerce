import { useEffect, useState } from "react";
import type { Product } from "../Types/productTypes";
import StarRating from "./StarRating";
import { CgClose } from "react-icons/cg";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cartSlice";
import { toggleFavourite } from "../features/favouriteSlice";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

interface PropsType {
  selectedProduct: Product;
  handleClose: () => void;
}

const SelectedProductSlideBar = ({
  selectedProduct,
  handleClose,
}: PropsType) => {
  const dispatch = useAppDispatch();
  const [selectedImg, setSelectedImg] = useState(selectedProduct?.images[0]);
  const favoriteItems = useAppSelector((state) => state.favourite);
  const { isAuth } = useAppSelector((state) => state.user);

  const isFavorite = (productId: number) => {
    return favoriteItems.some((favItem) => favItem.id == productId);
  };

  const handleFavorite = (product: Product) => {
    dispatch(toggleFavourite(product));
  };

  useEffect(
    () => setSelectedImg(selectedProduct?.images[0]),
    [selectedProduct],
  );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="sticky top-0 h-screen flex flex-col p-3 w-full">
      <div className="flex flex-col items-center">
        <CgClose
          onClick={handleClose}
          className="text-black dark:text-white self-start "
        />
        <img src={selectedImg} alt="thumbnail" className="w-60" />
        <div className="flex gap-2 pt-2">
          {selectedProduct?.images.map((curImg: string) => {
            return (
              <div
                className={`p-2 bg-gray-100 hover:cursor-pointer ${curImg == selectedImg && "border"}`}
                onClick={() => setSelectedImg(curImg)}
              >
                <img src={curImg} alt="" className={`w-20 `} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-gray-200 my-4"></div>

      <div className="flex justify-between">
        <h2 className="text-2xl">{selectedProduct?.title}</h2>
        <div onClick={() => handleFavorite(selectedProduct)}>
          {isFavorite(selectedProduct?.id) ? (
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
      <div className="flex gap-2 pt-2">
        <StarRating rating={selectedProduct?.rating} />
        <p>{selectedProduct?.reviews.length}</p>
      </div>
      <div className="flex justify-between gap-2 pt-2">
        <div className="flex gap-2">
          {selectedProduct.tags.map((curTag) => {
            return <p className="border border-gray-300 p-1">{curTag}</p>;
          })}
        </div>
        <h2 className="font-bold">${selectedProduct.price}</h2>
      </div>
      <div className="border border-gray-200 my-4"></div>
      <div>{selectedProduct.description}</div>

      <div className="border border-gray-200 my-4"></div>

      <div className="flex gap-2 flex-wrap items-center justify-between">
        {isAuth ? (
          <button
            className="bg-blue-600 text-white rounded-md px-3 py-2 hover:cursor-pointer"
            onClick={() => handleAddToCart(selectedProduct)}
          >
            Add To Cart
          </button>
        ) : (
          <NavLink to="/login">
            <button className="bg-blue-600 text-white rounded-md px-3 py-2 hover:cursor-pointer">
              Add To Cart
            </button>
          </NavLink>
        )}

        <NavLink to={`/product-details/${selectedProduct.id}`}>
          <button className="bg-purple-500 text-white rounded-md px-3 py-2 hover:cursor-pointer">
            See More
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default SelectedProductSlideBar;
