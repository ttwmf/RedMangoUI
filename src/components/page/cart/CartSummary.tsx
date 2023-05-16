import React from "react";
import { cartItemModel } from "../../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../storage/redux/store";
import {
  removeFromCart,
  updateQuantity,
} from "../../../storage/redux/shoppingCartSlice";
import { useAddOrUpdateShoppingCartMutation } from "../../../apis/shoppingCartApi";

function CartSummary() {
  const dispatch = useDispatch();
  const [addOrUpdateShoppingCart] = useAddOrUpdateShoppingCartMutation();
  const cartItemsFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  if (!cartItemsFromStore) {
    return <div>Shopping Cart Empty</div>;
  }

  const handleQuantity = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    const newQuantity = cartItem.quantity! + updateQuantityBy;
    if (newQuantity <= 0) {
      // remove item
      dispatch(removeFromCart({ id: cartItem.id }));
    } else {
      // update the quantity
      dispatch(updateQuantity({ quantity: newQuantity, id: cartItem.id }));
    }
    addOrUpdateShoppingCart({
      userId: "0ee50b2d-d2a0-48d3-a51e-7264806f1cf8",
      menuItemId: cartItem.menuItem?.id,
      quantity: updateQuantityBy,
    });
  };

  return (
    <div className="container p-4 m-2">
      <h4 className="text-center text-success">Cart Summary</h4>
      {cartItemsFromStore.map((cartItem: cartItemModel, index: number) => (
        <div
          key={index}
          className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
          style={{ background: "ghostwhite" }}
        >
          <div className="p-3">
            <img
              src={cartItem.menuItem?.image}
              alt=""
              width={"120px"}
              className="rounded-circle"
            />
          </div>

          <div className="p-2 mx-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 300 }}>{cartItem.menuItem?.name}</h4>
              <h4>
                $1{(cartItem.quantity! * cartItem.menuItem!.price).toFixed(2)}
              </h4>
            </div>
            <div className="flex-fill">
              <h4 className="text-danger">${cartItem.menuItem?.price}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                style={{
                  width: "100px",
                  height: "43px",
                }}
              >
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-dash-circle-fill"
                    onClick={() => handleQuantity(-1, cartItem)}
                  ></i>
                </span>
                <span>
                  <b>{cartItem.quantity}</b>
                </span>
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-plus-circle-fill"
                    onClick={() => handleQuantity(1, cartItem)}
                  ></i>
                </span>
              </div>

              <button
                className="btn btn-danger mx-1"
                onClick={() => handleQuantity(-cartItem.quantity!, cartItem)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartSummary;
