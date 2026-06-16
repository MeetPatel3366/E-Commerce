import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import api from "../api/axios";

const HomeSearch = () => {
  const [search, setSearch] = useState<string>("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/products/category-list");
        const data = res.data;

        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories()
  }, []);

  const handleCat=(curCat)=>
  {
    
  }

  return (
    <div className="w-2/6 h-screen bg-blue-400 p-2">
      <div className="border-2 flex items-center gap-2 bg-gray-300 rounded-2xl p-2">
        <CiSearch />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full"
        />
      </div>

      <div className="py-4">
        <h2 className="font-bold">Categories</h2>

        <ul>
            {categories.map((curCat)=>{
            return(
                <li>
                    <p onClick={()=>handleCat(curCat)}>{curCat}</p></li>
            )
        })}
        </ul>
      </div>
    </div>
  );
};

export default HomeSearch;
