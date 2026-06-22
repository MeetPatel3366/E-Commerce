import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layout/MainLayout";
import { lazy, Suspense } from "react";
import ProductSkeleton from "./components/ProductSkeleton";

const Home = lazy(() => import("./layout/Home"));
const Cart = lazy(() => import("./components/Cart"));
const Favourite = lazy(() => import("./components/Favourite"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Login = lazy(() => import("./components/Login"));
const Newcomponent = lazy(() => import("./components/Newcomponent"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product-details/:id",
          element: (
            <Suspense fallback={<ProductSkeleton />}>
              <ProductDetails />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/favourite",
          element: <Favourite />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/new",
          element: <Newcomponent />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
