import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => (
  <div className="w-full flex flex-col p-3">
    <p className="mb-4">
      <Skeleton width={40} height={40} circle />
    </p>

    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 p-3">
      <div className="flex flex-col items-center">
        <Skeleton width={384} height={384} borderRadius={8} />

        <div className="flex gap-2 pt-2">
          <Skeleton width={80} height={80} borderRadius={4} />
          <Skeleton width={80} height={80} borderRadius={4} />
          <Skeleton width={80} height={80} borderRadius={4} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton width={200} height={32} />
        <div className="flex gap-2 pt-2">
          <Skeleton width={100} height={20} />
          <Skeleton width={80} height={20} />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <Skeleton width={80} height={40} />
          <Skeleton width={60} height={24} />
        </div>
        <Skeleton width={120} height={24} />
        <div className="border border-gray-200 my-4"></div>
        <Skeleton count={4} />
        <div className="border border-gray-200 my-4"></div>
        <div className="space-y-2">
          <Skeleton width={150} height={20} />
          <Skeleton width={150} height={20} />
          <Skeleton width={150} height={20} />
          <Skeleton width={150} height={20} />
        </div>
        <div className="flex gap-2">
          <Skeleton width={60} height={30} />
          <Skeleton width={60} height={30} />
          <Skeleton width={60} height={30} />
        </div>
        <Skeleton width={200} height={20} />
        <Skeleton width={300} height={20} />
        <Skeleton width={250} height={20} />
        <Skeleton width={200} height={20} />

        <div className="flex justify-between pt-4">
          <Skeleton width={140} height={40} />
          <Skeleton width={40} height={40} circle />
        </div>
      </div>
    </div>
    <div className="mt-8">
      <Skeleton width={150} height={28} />
      <Skeleton count={3} />
    </div>
  </div>
);

export default ProductSkeleton
