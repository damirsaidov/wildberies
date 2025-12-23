import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Error from "./components/error";
import Login from "./pages/login";
import GetProduct from "./pages/getProduct";
import Register from "./pages/register";
import AboutId from "./pages/aboutId";
import Wishlist from "./pages/wishlist";
import Cart from "./pages/cart";
import Profile from "./pages/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        index:true,
        element: <Home/>
      },
      {
        path:"*",
        element:<Error/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path: "products/:id",
        element: <GetProduct/>
      },

      {
        path: "about/:id",
        element: <AboutId/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "wishlist",
        element: <Wishlist/>
      },
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "profile",
        element: <Profile/>
      }
    ]
  },
]);
