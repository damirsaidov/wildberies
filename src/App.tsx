import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Error from "./components/error";
import Login from "./pages/login";
import GetProduct from "./pages/getProduct";
import Register from "./pages/register";

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
        path: "register",
        element: <Register/>
      }
    ]
  },
]);
