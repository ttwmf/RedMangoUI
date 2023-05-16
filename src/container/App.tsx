import React from "react";
import { Header, Footer } from "../components/layout";
import { Home, MenuItemDetails, NotFound, ShoppingCart } from "../pages";
import { Routes, Route, useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetShoppingCartsByUserIdQuery } from "../apis/shoppingCartApi";
import { setShoppingCart } from "../storage/redux/shoppingCartSlice";
import { shoppingCartModel } from "../interfaces";

function App() {
  const dispatch = useDispatch();
  const {data, isLoading} = useGetShoppingCartsByUserIdQuery("0ee50b2d-d2a0-48d3-a51e-7264806f1cf8");

  useEffect( () => {
    if(!isLoading){
      console.log(data.data)
      dispatch(setShoppingCart(data.data.cartItems))
    }
  }, [data])
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu-items/:menuItemId" element={<MenuItemDetails/>}></Route>
          <Route path="/shopping-cart" element={<ShoppingCart/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
