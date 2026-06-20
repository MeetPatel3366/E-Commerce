import { useEffect, useState } from "react";
import useNewInfiniteScroll from "../hooks/useNewInfiniteScroll";
import type { Product, ProductResponse } from "../Types/productTypes";
import useNewAnotherInfiniteScroll from "../hooks/useNewAnotherInfiniteScroll";

const Newcomponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [loading,setLoading]=useState<boolean>(false)
  console.log(page);

  const [hasMore,setHasMore]=useState<boolean>(true)

  const loadMore = () => {
    if(loading) return
    setPage((prev) => prev + 1);
  };

//   const observerRef = useNewInfiniteScroll(loadMore);
const observerRef=useNewAnotherInfiniteScroll(loadMore,hasMore)
  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
          console.log("Fetching page:", page);
        

      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10}`,
      );
      const data:ProductResponse = await res.json() ;

      setProducts((prev) => [...prev, ...data.products]);
      if(data.products.length>0)
      {
        setHasMore(true)
      }
      setLoading(false)
    };
    fetchProducts();
  }, [page]);
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="text-9xl">{product.title}</div>
      ))}

      {/* <div ref={observerRef}>Loading more...</div> */}

      {hasMore && (
        <div ref={observerRef}>Loading more....</div>
      )}
    </div>
  );
};

export default Newcomponent;


// Page Loads
//     ↓
// Fetch 10 Products
//     ↓
// Show Products
//     ↓
// Observer watches
//     "Loading more..."
//     ↓
// User gets within 300px
//     ↓
// Observer fires
//     ↓
// loadMore()
//     ↓
// page++
//     ↓
// Fetch next 10 products
//     ↓
// Append products
//     ↓
// Move Loading element lower
//     ↓
// Observer watches again
//     ↓
// Repeat until hasMore = false