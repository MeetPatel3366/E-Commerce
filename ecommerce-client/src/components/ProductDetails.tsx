import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProduct } from "../features/productSlice";
import StarRating from "./StarRating";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import type { Product } from "../Types/productTypes";
import { addToCart } from "../features/cartSlice";
import { toggleFavourite } from "../features/favouriteSlice";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

import ProductSkeleton from "./ProductSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // console.log(id)
  const { product, loading } = useAppSelector((state) => state.products);
  const { isAuth } = useAppSelector((state) => state.user);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const favoriteItems = useAppSelector((state) => state.favourite);

  const isFavorite = (productId: number) => {
    return favoriteItems.some((favItem) => favItem.id == productId);
  };
  // console.log("product: ",product)
  useEffect(() => {
    setSelectedImg(null);
    if (id) {
      dispatch(fetchProduct(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.thumbnail) {
      setSelectedImg(product.thumbnail);
    }
  }, [product?.id]);

  useEffect(() => {
    setSelectedImg(null);
  }, [id]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleFavorite = (product: Product) => {
    dispatch(toggleFavourite(product));
  };

  if (loading || !product) {
    return <ProductSkeleton />;
  }

  return (
    product && (
      <div className="w-full flex flex-col p-3">
        <p>
          <NavLink to={"/"} onClick={() => setSelectedImg("")}>
            <IoChevronBackOutline />
          </NavLink>
        </p>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 p-3">
          <div className="flex flex-col items-center">
            <img
              src={selectedImg ? selectedImg : ""}
              alt={product?.title}
              className="w-96"
              loading="eager"
            />

            <div className="flex gap-2 pt-2">
              {product?.images.map((curImg: string) => {
                return (
                  <div
                    className={`p-2 bg-gray-100 hover:cursor-pointer ${curImg == selectedImg && "border"}`}
                    onClick={() => setSelectedImg(curImg)}
                  >
                    <img src={curImg} alt="" className={`w-20 `}  />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl">{product?.title}</h2>
            <div className="flex gap-2 pt-2">
              <StarRating rating={product?.rating} />
              <p>({product?.reviews.length} reviews)</p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-3xl font-bold">${product.price}</span>

              <span className="text-green-600 font-semibold">
                {product.discountPercentage}% OFF
              </span>
            </div>
            <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded">
              {product.availabilityStatus}
            </span>
            <div className="border border-gray-200 my-4"></div>
            <div>{product?.description}</div>

            <div className="border border-gray-200 my-4"></div>

            <div className="space-y-2">
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>SKU:</strong> {product.sku}
              </p>
              <p>
                <strong>Weight:</strong> {product.weight}g
              </p>
            </div>
            <div className="flex gap-2">
              {product?.tags.map((curTag) => {
                return (
                  <p id={curTag} className="border border-gray-300 p-1">
                    {curTag}
                  </p>
                );
              })}
            </div>
            <p>
              {product?.dimensions.width} x {product?.dimensions.height} x{" "}
              {product?.dimensions.depth} cm
            </p>

            <p>{product?.shippingInformation}</p>
            <p>{product?.warrantyInformation}</p>
            <p>{product?.returnPolicy}</p>

            <div className="flex justify-between">
              {isAuth ? (
                <button
                  className="bg-blue-600 text-white rounded-md px-3 py-2 hover:cursor-pointer"
                  onClick={() => handleAddToCart(product)}
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
              <div onClick={() => handleFavorite(product)}>
                {isFavorite(product?.id) ? (
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
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          {product?.reviews.map((review, idx) => (
            <div key={idx} className="border rounded-lg p-4 mb-4 shadow-sm">
              <div className="flex gap-5">
                <strong>{review.reviewerName}</strong>
                <p className="flex items-center gap-2">
                  <FaStar /> {review.rating}
                </p>
              </div>
              <p>{review?.comment}</p>
              <small>{new Date(review.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ProductDetails;
