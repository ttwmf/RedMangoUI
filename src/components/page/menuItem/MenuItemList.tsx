import React from 'react'
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../interfaces";
import MenuItemCard from './MenuItemCard';
import { setMenuItems } from '../../../storage/redux/menuItemsSlice';
import { useDispatch } from 'react-redux';
import { useGetMenuItemsQuery } from '../../../apis/menuItemApi';
import { MainLoader } from '../common';

function MenuItemList() {
    //const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
    const dispatch = useDispatch();
    const {data, isLoading} = useGetMenuItemsQuery(null);

    useEffect(() => {
      if (!isLoading){
        dispatch(setMenuItems(data.data));
      }
    }, [isLoading]);

  if(isLoading){
    return (<MainLoader />)
  }
  return (
    <div className='container'>
    <div className="row">
      {data.data.length > 0 && data.data.map((menuItem: menuItemModel, index: number) => {
        return(<MenuItemCard menuItem={menuItem} key={index} />);
      })}
    </div>
    </div>
  )
}

export default MenuItemList
