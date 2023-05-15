import React from 'react'
import { useState, useEffect } from "react";
import { menuItemModel } from "../../interfaces";
import MenuItemCard from './MenuItemCard';

function MenuItemList() {
    const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

    useEffect(() => {
      fetch("https://localhost:44353/api/menu-items/all")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMenuItems(data.data);
        });
    }, []);
  return (
    <div className='container'>
    <div className="row">
      {menuItems.length > 0 && menuItems.map((menuItem, index) => {
        return(<MenuItemCard menuItem={menuItem} key={index} />);
      })}
    </div>
    </div>
  )
}

export default MenuItemList
