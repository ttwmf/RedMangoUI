import React, { useState } from "react";
import { apiResponse, menuItemModel, userModel } from "../../../interfaces";
import { NavLink, Link } from "react-router-dom";
import { useAddOrUpdateShoppingCartMutation } from "../../../apis/shoppingCartApi";
import { MiniLoader } from "../common";
import { toastNotify } from "../../../helpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../storage/redux/store";


interface Props {
  menuItem: menuItemModel;
}

function MenuItemCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [addOrUpdateShoppingCart] = useAddOrUpdateShoppingCartMutation();
  const userData :userModel = useSelector((state: RootState) => state.useAuthStore);
  const navigate = useNavigate();

  const handleAddOrUpdateShoppingCart = async (menuItemId: number) => {
    if(!userData.id){
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    const response:any = await addOrUpdateShoppingCart({
      userId: userData.id,
      menuItemId: menuItemId,
      quantity: 1,
    });
    const data:apiResponse = response.data;
    
    if(data && data.isSuccess){
      toastNotify("Item added to cart successfully!");
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <NavLink to={`menu-items/${props.menuItem.id}`}>
              <img
                src={props.menuItem.image}
                style={{ borderRadius: "50%" }}
                alt="FAIL"
                className="w-100 mt-5 image-box"
              />
            </NavLink>
          </div>
          {props.menuItem.specialTag &&
            props.menuItem.specialTag.length > 0 && (
              <i
                className="bi bi-star btn btn-success"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  outline: "none !important",
                  cursor: "pointer",
                }}
              >
                &nbsp; {props.menuItem.specialTag}
              </i>
            )}

          {isAddingToCart ? (
            <div style={{ position: "absolute", top: "15px", right: "15px" }}>
              <MiniLoader />
            </div>
          ) : (
            <i
              onClick={() => handleAddOrUpdateShoppingCart(props.menuItem.id)}
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
            ></i>
          )}
          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`menu-items/${props.menuItem.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {props.menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
