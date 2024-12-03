import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/navber/Navber";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import ExploreMenu from "./components/exploreMenu/ExploreMenu";
import AppDownload from "./components/AppDownload/AppDownload";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Profile from "./pages/Profile/Profile";
import Error from "./components/Error/Error";
import SearchInput from "./pages/searchInput/SearchInput";
import OrderDone from "./pages/orderDone/OrderDone";
function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  return (
    <>
      {showLoginPopup ? (
        <LoginPopup setShowLoginPopup={setShowLoginPopup} />
      ) : (
        <> </>
      )}
      <div className="main">
        <Navbar setShowLoginPopup={setShowLoginPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<ExploreMenu />} />
          <Route path="/mobile-app" element={<AppDownload />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<Error />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderdone" element={<OrderDone />} />
          <Route path="/search" element={<SearchInput />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
