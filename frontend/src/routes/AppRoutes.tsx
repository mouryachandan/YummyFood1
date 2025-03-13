import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "../components/pages/navbar";
import ErrorPage from "../components/pages/ErrorPage";

const Login = lazy(() => import("../components/pages/Login"));
const Home = lazy(() => import("../components/pages/Homepage"));
const AdminDashboard = lazy(() => import("../components/pages/AdminDashboard"));
const Idli = lazy(() => import("../components/pages/foodpage"));
const Menu = lazy(() => import("../components/pages/Menu"));
const About = lazy(() => import("../components/pages/About"));
const CartPage = lazy(() => import("../components/pages/CartPage"));

interface AppRoutesProps {
  cart: any[];
  onAddToCart: (food: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userId: number;
}

const Layout: React.FC<AppRoutesProps> = ({ cart, searchQuery, setSearchQuery }) => {
  return (
    <>
      <Navbar cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

const createRouter = (props: AppRoutesProps) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminDashboard />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: <Layout {...props} />,
      children: [
        {
          path: "home",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "food/:name",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Idli />
            </Suspense>
          ),
        },
        {
          path: "menu",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Menu searchQuery={props.searchQuery} />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CartPage userId={props.userId} />
            </Suspense>
          ),
        },
      ],
    },
  ]);

const AppRoutes: React.FC<AppRoutesProps> = (props) => {
  return <RouterProvider router={createRouter(props)} />;
};

export default AppRoutes;
