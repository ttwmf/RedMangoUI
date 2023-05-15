import React from "react";
import { Header, Footer } from "../components/layout";
import { Home, MenuItemDetails, NotFound } from "../pages";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu-items/:menuItemId" element={<MenuItemDetails/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
