import { NavLink, useNavigate } from "react-router";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import UserProfile from "./UserProfile";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, setTheme } from "../../features/userSlice";
import { FiMoon, FiSun } from "react-icons/fi";

const Sidebar = () => {
  const navigate=useNavigate()
  const { isAuth, theme } = useAppSelector((state) => state.user);
  const { items } = useAppSelector((state) => state.cart);
  const favItems = useAppSelector((state) => state.favourite);
  const dispatch = useAppDispatch();
  console.log("theme: ", theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  };

  return (
    // <aside className="w-64 h-screen sticky top-0 p-2 flex flex-col justify-between bg-white text-black dark:bg-gray-900 dark:text-white">
    <aside className=" hidden md:flex w-64 h-screen p-2  sticky top-0 flex-col justify-between bg-white text-black dark:bg-gray-900 dark:text-white">
      <div>
        {/* <button onClick={()=>handleTheme(theme)} className="bg-blue-300">{theme}</button> */}
        <UserProfile />

        <nav className="flex flex-col gap-4 mt-3">
          <NavLink to="/">
            <div className="flex gap-4 items-center">
              <FaHome />
              <span>Home</span>
            </div>
          </NavLink>
          {isAuth ? (
            <div className="flex flex-col gap-4">
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
            </div>
          ) : (
            <div className="flex flex-col gap-4">
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
            </div>
          )}

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

      <div>
        {isAuth ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 font-bold rounded-md"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="bg-blue-500 text-white p-2 font-bold rounded-md">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
