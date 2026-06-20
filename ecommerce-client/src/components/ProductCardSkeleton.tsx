// import Skeleton from "react-loading-skeleton";

// const ProductCardSkeleton = () => {
//   return (
//     <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded h-[260px]">
//       <div className="flex justify-between">
//         <div className="w-full">
//           <Skeleton height={20} width="70%" />
//           <div className="mt-2">
//             <Skeleton height={18} width={80} />
//           </div>
//         </div>

//         <Skeleton circle width={24} height={24} />
//       </div>

//       <div className="flex flex-col p-4 justify-center items-center">
//         <Skeleton width={110} height={110} />

//         <div className="mt-4">
//           <Skeleton width={120} height={20} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCardSkeleton;

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-gray-50 p-2 rounded dark:bg-gray-800 h-[260px]">
      <div className="flex justify-between">
        <div className="pl-2 flex-1">
          <Skeleton height={20} width="80%" />
          <div className="mt-2">
            <Skeleton height={18} width={70} />
          </div>
        </div>

        <div className="pt-1">
          <Skeleton circle width={24} height={24} />
        </div>
      </div>

      <div className="flex flex-col p-4 justify-center items-center">
        <Skeleton width={112} height={112} />
        <div className="mt-4 flex gap-2 items-center">
          <Skeleton width={90} height={18} />
          <Skeleton width={30} height={18} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;