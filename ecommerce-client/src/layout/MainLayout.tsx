import { Outlet } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";
import { Suspense, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import MobileNav from "../components/sidebar/MobileNav";

const MainLayout = () => {
  const { theme } = useAppSelector((state) => state.user);

  useEffect(() => {
    const html = document.documentElement;

    if (theme == "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className="flex gap-2 min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white ">
      
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <Suspense >
        <Outlet />
      </Suspense>
      <MobileNav/>
    </div>
  );
};

export default MainLayout;
