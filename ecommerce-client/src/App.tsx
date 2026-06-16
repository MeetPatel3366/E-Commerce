import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./layout/MainLayout"
import Home from "./layout/Home"
import Cart from "./components/Cart"
import Favourite from "./components/Favourite"

const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"/home",
          element:<Home/>
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/favourite",
          element:<Favourite/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App