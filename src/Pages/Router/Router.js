import Blog from "../../Blog/Blog";
import AllProductContainer from "../../Products/AllProductContainer";
import AllProducts from "../../Products/AllProducts";
import AddProduct from "../AddProduct/AddProduct";
import AllSeller from "../Dashboard/AllUser/AllSeller";
import AllUser from "../Dashboard/AllUser/AllUser";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Dashboard/DashboardLayout";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import Payment from "../Dashboard/Payment/Payment";
import ReportedItems from "../Dashboard/ReportedItem/ReportedItems";
import MyProduct from "../Dashboard/SellerProduct/MyProduct";
import Products from "../Dashboard/SellerProduct/Products";
import ErrorPage from "../ErrorPage/ErrorPage";

import Home from "../Home/Home";
import Main from "../Layout/Main";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";


export const { createBrowserRouter } = require("react-router-dom");

export const router=createBrowserRouter([
    {path:'/',errorElement:<ErrorPage></ErrorPage>,element:<Main></Main>,children:[
        {path:'/',element:<Home></Home>},
        {path:'/home',element:<Home></Home>},
        {path:'/category/:id',element:<AllProductContainer></AllProductContainer>, loader:({params})=>fetch(`https://mobile-bazar-server.vercel.app/category/${params.id}`)},
        {path:'/login',element:<Login></Login>},
        {path:'/signup',element:<SignUp></SignUp>},
        {path:'/blog',element:<Blog></Blog>},
    ]},
    {path:'/dashboard',errorElement:<ErrorPage></ErrorPage>,element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,children:[
        {path:'/dashboard',element:<Dashboard></Dashboard>},
        {path:'/dashboard/addProduct',element:<AddProduct></AddProduct>},
        {path:'/dashboard/addProduct',element:<AddProduct></AddProduct>},
        {path:'/dashboard/orders',element:<MyOrders></MyOrders>},
        {path:'/dashboard/user',element:<AdminRoute><AllUser></AllUser></AdminRoute>},
        {path:'/dashboard/user/seller',element:<AdminRoute><AllSeller></AllSeller></AdminRoute>},
        {path:'/dashboard/user/products',element:<SellerRoute><MyProduct></MyProduct></SellerRoute>},
        {path:'/dashboard/products',element:<AdminRoute><Products></Products></AdminRoute>},
        {path:'/dashboard/reportedItem',element:<AdminRoute><ReportedItems></ReportedItems></AdminRoute>},
        {path:'/dashboard/payment/:id',element:<PrivateRoute><Payment></Payment></PrivateRoute>,
        loader:({params})=>fetch(`https://mobile-bazar-server.vercel.app/bookedProduct/${params.id}`)
    },
    ]}
])