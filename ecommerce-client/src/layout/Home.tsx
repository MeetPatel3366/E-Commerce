import { useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import useDebounce from "../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategories,
  fetchSearchProduct,
  nextPage,
  setCategory,
  setSearchQuery,
} from "../features/productSlice";
import CategoryList from "../components/CategoryList";
import useinfiniteScroll from "../hooks/useInfiniteScroll";
import PriceFilter from "../components/PriceFilter";
import type { Product } from "../Types/productTypes";
import SelectedProductSlideBar from "../components/SelectedProductSlideBar";
import ProductGrid from "../components/ProductGrid";
import SortFilter from "../components/SortFilter";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    searchQuery,
    page,
    searchResults,
    categories,
    hasMore,
    selectedCategory,
    products,
  } = useAppSelector((state) => state.products);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<
    | "default"
    | "plowToHigh"
    | "pHighToLow"
    | "rlowToHigh"
    | "rHighToLow"
    | "nameAtoZ"
    | "nameZtoA"
  >("default");

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const debouncedSearch = useDebounce(searchQuery, 2000);
  const isSearching = debouncedSearch.trim().length > 0;

  // useEffect(() => {
  //   if (!debouncedSearch.trim()) {
  //     dispatch(resetPage());
  //     return;
  //   }
  //   dispatch(fetchSearchProduct({ query: debouncedSearch, page }));
  // }, [debouncedSearch, page, dispatch]);

  useEffect(() => {
    console.log("searchQuery:", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    console.log("searchResults:", searchResults);
  }, [searchResults]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log("categories : ", categories);
  }, [categories]);

  // useEffect(() => {
  //   if (categories.length > 0 && !selectedCategory) {
  //     dispatch(setCategory(categories[0]));
  //   }
  // }, [categories, selectedCategory, dispatch]);

  useEffect(() => {
    if (products.length == 0 || selectedCategory == "") {
      dispatch(fetchAllProducts({ page }));
    }
  }, [dispatch, page]);

  // useEffect(() => {
  //   if (!debouncedSearch.trim() && selectedCategory) {
  //     dispatch(fetchProductsByCategories({ category: selectedCategory, page }));
  //     console.log("hasMOre: ", hasMore);
  //   }
  // }, [selectedCategory, page, dispatch]);

  useEffect(() => {
    if (isSearching) {
      dispatch(fetchSearchProduct({ query: debouncedSearch, page }));
    } else if (selectedCategory) {
      dispatch(fetchProductsByCategories({ category: selectedCategory, page }));
    }
  }, [dispatch, page, debouncedSearch, selectedCategory, isSearching]);

  useEffect(() => {
    console.log("category items: ", products);
  }, [products]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(nextPage());
    }
  }, [loading, hasMore, dispatch]);

  useinfiniteScroll(handleLoadMore);

  useEffect(() => {
    console.log("Page: ", page);
  }, [page]);

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handleSelectCategory = (category: string) => {
    dispatch(setCategory(category));
  };

  const displayProducts = isSearching ? searchResults : products;
  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  const filteredProducts = useMemo(() => {
    const filtered = displayProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    if (sortBy == "plowToHigh") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy == "pHighToLow") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    if (sortBy == "rlowToHigh") {
      return [...filtered].sort((a, b) => a.rating - b.rating);
    }

    if (sortBy == "rHighToLow") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }

    if (sortBy == "nameAtoZ") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy == "nameZtoA") {
      return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
  }, [displayProducts, minPrice, maxPrice, sortBy]);

  const handleCloseSelectedProductSlider = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-2 lg:flex-row gap-4">
      {/* <div className="sticky top-0 h-screen overflow-y-auto"> */}
      <button
        className="lg:hidden w-full p-3 rounded-lg border mb-4"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filters
      </button>
      <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <SearchBar value={searchQuery} onChange={handleSearch} />
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleSelectCategory}
          />
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* <ProductGrid
        filteredProducts={filteredProducts}
        setSelectedProduct={setSelectedProduct}
        searchQuery={searchQuery}
     
      /> */}

      {loading ? (
        <div className="w-full lg:flex-1 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(330px,1fr))]">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ProductGrid
          filteredProducts={filteredProducts}
          setSelectedProduct={setSelectedProduct}
          searchQuery={searchQuery}
        />
      )}

      {selectedProduct && (
        <aside className="fixed inset-0 z-50 bg-white dark:bg-black lg:static lg:w-[500px] lg:min-w-[500px] lg:max-w-[500px] lg:flex-shrink-0">
          <SelectedProductSlideBar
            selectedProduct={selectedProduct}
            handleClose={handleCloseSelectedProductSlider}
          />
        </aside>
      )}
    </div>
  );
};

export default Home;
