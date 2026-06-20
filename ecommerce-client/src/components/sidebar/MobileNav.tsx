import { FaHome, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CiStar } from "react-icons/ci";
import { FiMoon, FiSun } from "react-icons/fi";
import { setTheme } from "../../features/userSlice";

const MobileNav = () => {
  const { isAuth, theme } = useAppSelector((state) => state.user);
  const { items } = useAppSelector((state) => state.cart);
  const favItems = useAppSelector((state) => state.favourite);
  const dispatch = useAppDispatch();
  return (
    <div
      className="
      fixed bottom-0 left-0 right-0
      md:hidden
      bg-white dark:bg-gray-900
      border-t
      flex justify-around
      py-3
      z-50
      "
    >
      <nav className="flex flex-wrap gap-8 mt-3">
        <NavLink to="/">
          <div className="flex gap-4 items-center">
            <FaHome />
            <span>Home</span>
          </div>
        </NavLink>
        <div className="flex flex-wrap  gap-6">
          {isAuth ? (
            <>
              <NavLink to="/cart">
                <div className="flex gap-4 items-center">
                  <FaShoppingCart />
                  <span>Cart</span>
                  <span>{items.length}</span>
                </div>
              </NavLink>
              <NavLink to="/favourite">
                <div className="flex gap-4 items-center">
                  <CiStar />
                  <span>Favourite</span>
                  <span>{favItems.length}</span>
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <div className="flex gap-4 items-center">
                  <FaShoppingCart />
                  <span>Cart</span>
                </div>
              </NavLink>
              <NavLink to="/login">
                <div className="flex gap-4 items-center">
                  <CiStar />
                  <span>Favourite</span>
                </div>
              </NavLink>
            </>
          )}
        </div>

        <button
          onClick={() =>
            dispatch(setTheme(theme === "light" ? "dark" : "light"))
          }
        >
          {theme === "light" ? (
            <FiMoon color="#4a5568" />
          ) : (
            <FiSun color="#ffc107" />
          )}
        </button>
      </nav>
    </div>
  );
};

export default MobileNav;
