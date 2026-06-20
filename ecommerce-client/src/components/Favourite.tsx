// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import StarRating from "./StarRating";
// import type { Product } from "../Types/productTypes";
// import { MdOutlineFavorite } from "react-icons/md";
// import { toggleFavourite } from "../features/favouriteSlice";
// import { NavLink } from "react-router";

// const Favourite = () => {
//   const dispatch = useAppDispatch();
//   const favoriteItems = useAppSelector((state) => state.favourite);

//   const hanldetoggleFavourite = (product: Product) => {
//     dispatch(toggleFavourite(product));
//   };

//   return (
//     <div className="w-full grid grid-cols-4 gap-3 p-4 h-screen">
//       {favoriteItems &&
//         favoriteItems.map((item) => (
//           <NavLink to={`/product-details/${item?.id}`}>
//             <div className="w-full h-full border flex flex-col p-3 rounded-md">
//               <div className="flex flex-col items-center justify-around h-48">
//                 <img
//                   src={item?.images[0]}
//                   alt="thumbnail"
//                   className="max-h-full object-contain"
//                 />
//               </div>

//               <div className="border border-gray-200 my-4"></div>

//               <h2 className="text-2xl">{item?.title}</h2>
//               <div className="flex gap-2 pt-2">
//                 <StarRating rating={item?.rating} />
//                 <p>{item?.reviews.length}</p>
//               </div>

//               <div className="mt-auto">
//                 <div className="flex gap-2 pt-2">
//                   {item.tags.map((curTag) => {
//                     return (
//                       <p className="border border-gray-300 p-1">{curTag}</p>
//                     );
//                   })}
//                 </div>
//                 <h2 className="font-bold pt-2 text-right">${item.price}</h2>
//                 <div className="border border-gray-200 my-4"></div>

//                 <div className="flex justify-end">
//                   <button onClick={() => hanldetoggleFavourite(item)} >
//                     <MdOutlineFavorite />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </NavLink>
//         ))}
//     </div>
//   );
// };

// export default Favourite;

import { useAppDispatch, useAppSelector } from "../app/hooks";
import StarRating from "./StarRating";
import type { Product } from "../Types/productTypes";
import { MdOutlineFavorite } from "react-icons/md";
import { toggleFavourite } from "../features/favouriteSlice";
import { NavLink } from "react-router";

const Favourite = () => {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favourite);

  const handleToggleFavourite = (product: Product) => {
    dispatch(toggleFavourite(product));
  };

  if (!favoriteItems.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-3">
          No Favorites Yet
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Save items you like by tapping the heart icon.
        </p>

        <NavLink
          to="/"
          className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Start Shopping
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          My Favorites
        </h1>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="
                group
                bg-white dark:bg-slate-900
                border border-gray-200 dark:border-slate-700
                rounded-xl
                overflow-hidden
                shadow-sm hover:shadow-xl
                transition
              "
            >
              {/* Product Link (ONLY image/title clickable) */}
              <NavLink to={`/product-details/${item.id}`}>
                
                {/* Image */}
                <div className="h-48 flex items-center justify-center bg-gray-100 dark:bg-slate-800 p-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="max-h-full object-contain group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  {/* Title */}
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {item.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <StarRating rating={item.rating} />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({item.reviews.length})
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="
                          text-xs px-2 py-1
                          border border-gray-300 dark:border-slate-600
                          rounded-md
                          text-gray-600 dark:text-gray-300
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </NavLink>

              {/* Bottom Action Bar */}
              <div className="px-4 pb-4 flex justify-end">
                <button
                  onClick={() => handleToggleFavourite(item)}
                  className="
                    p-2 rounded-lg
                    border border-red-400
                    text-red-500
                    hover:bg-red-500 hover:text-white
                    transition
                  "
                >
                  <MdOutlineFavorite />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourite;