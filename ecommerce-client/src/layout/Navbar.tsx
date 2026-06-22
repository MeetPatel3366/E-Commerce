import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import api from "../api/axios";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import type { User } from "../Types/productTypes";



const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("users/1?select=firstName,lastName,image");

        const data: User = res.data;
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="h-screen w-44 bg-gray-200">
      <div className="p-2 flex flex-col gap-7">
        <div className="flex justify-between ">
          <div className="pt-2">
            <span>{user?.firstName}</span> -<span>{user?.lastName}</span>
          </div>
          <div>
            <img src={user?.image} alt="userImg" className="w-10 rounded-md bg-neutral-800" />
          </div>
        </div>
        <ul className="flex flex-col justify-between gap-2">
            <NavLink to="/">
            <li>
                <div className="flex gap-4 items-center">
                <FaHome />
                <span>Home</span>
                </div>
            </li>
            </NavLink>
            <NavLink to="/cart">
            <li>
                <div className="flex gap-4 items-center">
                <FaShoppingCart />
                <span>Cart</span>
                </div>
            </li>
            </NavLink>
            <NavLink to="/favourite">
            <li>
                <div className="flex gap-4 items-center">
                <CiStar />
                <span>Favourite</span>
                </div>
            </li>
            </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
