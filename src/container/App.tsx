import React from "react";
import { Header, Footer } from "../components/layout";
import { AccessDenied, AuthenticationTest, AuthenticationTestAdmin, Home, Login, MenuItemDetails, NotFound, Register, ShoppingCart } from "../pages";
import { Routes, Route, useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartsByUserIdQuery } from "../apis/shoppingCartApi";
import { setShoppingCart } from "../storage/redux/shoppingCartSlice";
import { shoppingCartModel, userModel } from "../interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";
import { RootState } from "../storage/redux/store";

function App() {
  const dispatch = useDispatch();
  const userData:userModel = useSelector((state: RootState) => state.useAuthStore);
  const {data, isLoading} = useGetShoppingCartsByUserIdQuery(userData.id);
  console.log(data)
  console.log(userData)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      const userData: userModel = jwt_decode(token);
      dispatch(setLoggedInUser(userData));
    }
  }, []);
  useEffect( () => {
    if(!isLoading){
      dispatch(setShoppingCart(data.data.cartItems))
    }
  }, [data])
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu-items/:menuItemId" element={<MenuItemDetails/>} />
          <Route path="/shopping-cart" element={<ShoppingCart/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authentication" element={<AuthenticationTest />} />
          <Route path="/authorization" element={<AuthenticationTestAdmin />} />
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
