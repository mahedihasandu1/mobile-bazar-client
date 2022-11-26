import Blog from "../../Blog/Blog";
import AllProductContainer from "../../Products/AllProductContainer";
import AllProducts from "../../Products/AllProducts";
import AddProduct from "../AddProduct/AddProduct";
import AllSeller from "../Dashboard/AllUser/AllSeller";
import AllUser from "../Dashboard/AllUser/AllUser";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Dashboard/DashboardLayout";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import MyProduct from "../Dashboard/SellerProduct/MyProduct";
import Products from "../Dashboard/SellerProduct/Products";
import ErrorPage from "../ErrorPage/ErrorPage";

import Home from "../Home/Home";
import Main from "../Layout/Main";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";


export const { createBrowserRouter } = require("react-router-dom");

export const router=createBrowserRouter([
    {path:'/',errorElement:<ErrorPage></ErrorPage>,element:<Main></Main>,children:[
        {path:'/',element:<Home></Home>},
        {path:'/home',element:<Home></Home>},
        {path:'/category/:id',element:<AllProductContainer></AllProductContainer>, loader:({params})=>fetch(`http://localhost:5000/category/${params.id}`)},
        {path:'/login',element:<Login></Login>},
        {path:'/signup',element:<SignUp></SignUp>},
        {path:'/blog',element:<Blog></Blog>},
    ]},
    {path:'/dashboard',errorElement:<ErrorPage></ErrorPage>,element:<DashboardLayout></DashboardLayout>,children:[
        {path:'/dashboard',element:<Dashboard></Dashboard>},
        {path:'/dashboard/addProduct',element:<AddProduct></AddProduct>},
        {path:'/dashboard/addProduct',element:<AddProduct></AddProduct>},
        {path:'/dashboard/orders',element:<MyOrders></MyOrders>},
        {path:'/dashboard/user',element:<AllUser></AllUser>},
        {path:'/dashboard/user/seller',element:<AllSeller></AllSeller>},
        {path:'/dashboard/user/products',element:<MyProduct></MyProduct>},
        {path:'/dashboard/products',element:<Products></Products>},
    ]}
])