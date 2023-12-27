import { Navigate, Route, Router, Routes } from "react-router-dom";

import "./index.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Message from "./pages/Message";

import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

import useAuthStore from "./store/authStore";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

import Forgotscreen from "./auth/Forgotscreen";
import { DataProvider } from "./context/DataContext";
import Product from "./pages/Product";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProduct";
import Contact from "./pages/Contact";

function App() {
  const authUser = useAuthStore((state) => state.user);
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/auth"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          ></Route>

          <Route
            path="/forgotscreen"
            element={!authUser ? <Forgotscreen /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route
            path="/message"
            element={authUser ? <Message /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/product"
            element={authUser ? <Product /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/category"
            element={authUser ? <Category /> : <Navigate to={"/auth"} />}
          />

          <Route
            path="products/*"
            element={authUser ? <CategoryProduct /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/contact"
            element={authUser ? <Contact /> : <Navigate to={"/auth"} />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
