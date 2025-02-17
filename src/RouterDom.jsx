import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./Pages/Error404/Error404";
import Category from "./Pages/Category/Category";
import App from './App';
import Form from "./Pages/Login/Form";
import Brands from "./Pages/Brands/Brands";
import Layout from "./Pages/Layout/Layout";
import Product from "./Pages/Product/Product";
import Home from './Pages/Home/HomePages'

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: '/', // Default route inside App
                element: <Home/> ,
            },
            {
                path: "/login",
                element: <Form />,
            },
            {
                path: "/brands",
                element: <Brands />,
            },
            {
                path: "/category",
                element: <Category/>,
            },
            {
                path: "/product",
                element: <Product/>,
            }


        ]
    }
]);
