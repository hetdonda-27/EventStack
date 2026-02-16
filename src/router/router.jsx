import { useLocation, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Page from "../Page/page";
import Detail from "../Page/Detail";
import Categories from "../Categories/Categories";
import Search from "../Categories/Search";
import Bookevent from "../Payment/Bookevent";
import Makepayment from "../Payment/makepayment";
import Login from "../Login/login";
import ForgotPassword from "../Login/forgotpassword";
import ResetPassword from "../Login/ResetPassword";
import Footer from "../Footer/Footer";
import PaymentSuccess from "../Payment/Paymentsuccess";
import Register from "../Login/Register";
import AdminDashboard from "../admin/AdminDashboard";
import Makeevent from "../admin/createEvent";
import EditEvent from "../admin/EditEvent";
import Profile from "../admin/Profile";

const Layout = () => {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const updateRole = () => {
      const currentRole = localStorage.getItem("role") || "";
      if (currentRole !== role) setRole(currentRole);
    };

    updateRole();

    const handleStorageChange = (e) => {
      if (e.key === "role") updateRole();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [role]);

  const hideLayoutFor = ["/book", "/login", "/payment-success", "/register", "/forgot-password", "/reset-password"];
  const shouldHideLayout = hideLayoutFor.some((path) => location.pathname.startsWith(path));

  const hideuserLayoutFor = ["/createEvent", "/admin/editEvent", "/admin/dashboard", "/profile"];
  const shouldHideuserLayout = hideuserLayoutFor.some((path) => location.pathname.startsWith(path));

  const hidefooter = ["/admin/editEvent", "/admin/dashboard", "/createEvent"];
  const shouldfooter = hidefooter.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {!shouldHideLayout && <Header />}
      {!shouldHideLayout && !shouldHideuserLayout && <Hero />}
      <Outlet context={{ role }} />
      {!shouldHideLayout && !shouldfooter && <Footer />}
    </>
  );
};

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  if (!token || role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      { path: "/", element: <Navigate to="/login" replace /> },

      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },

      {
        path: "/admin/editEvent/:id",
        element: (
          <AdminRoute>
            <EditEvent />
          </AdminRoute>
        ),
      },

      {
        path: "/createEvent",
        element: (
          <AdminRoute>
            <Makeevent />
          </AdminRoute>
        ),
      },

      { path: "/home", element: <Page /> },
      { path: "/events", element: <Categories /> },
      { path: "/events/:id", element: <Detail /> },
      { path: "/search", element: <Search /> },

      {
        path: "/book/:id",
        element: (
          <ProtectedRoute>
            <Bookevent />
          </ProtectedRoute>
        ),
      },

      {
        path: "/book",
        element: (
          <ProtectedRoute>
            <Makepayment />
          </ProtectedRoute>
        ),
      },

      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },

      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },
]);

export default router;
