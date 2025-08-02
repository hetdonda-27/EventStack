import { useLocation, Navigate } from "react-router-dom";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Page from "../Page/page";
import Categories from "../Categories/Categories";
import Detail from "../Page/Detail";
import Search from "../Categories/Search";
import Bookevent from "../Payment/Bookevent";
import Makepayment from "../Payment/makepayment";
import Login from "../Login/login";
import Footer from "../Footer/Footer";
import PaymentSuccess from "../Payment/Paymentsuccess";
import Register from "../Login/Register";

const Layout = () => {
  const location = useLocation();

  const hideLayoutFor = ['/book', '/login', '/payment-success','/register'];
  const shouldHideLayout = hideLayoutFor.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Header />}
      {!shouldHideLayout && <Hero />}
      <Outlet />
      {/* {!shouldHideLayout && <PaymentSuccess/>} */}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      {path: "/register", element: <Register /> },
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/home", element: <Page /> },
      { path: "/events", element: <Categories /> },
      { path: "/events/:id", element: <Detail /> },
      { path: "/search", element: <Search /> },
      { path: "/book/:id", element: <Bookevent /> },
      {
        path: "/book", element: <Makepayment />
      },
      {
        path: "/payment-success", element: <PaymentSuccess />
      }
    ],
  },
]);

export default router;
