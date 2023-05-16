import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../apis/menuItemApi";
import { useNavigate } from "react-router-dom";
import { useAddOrUpdateShoppingCartMutation } from "../apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../components/page/common";
// UserId: 0ee50b2d-d2a0-48d3-a51e-7264806f1cf8

function MenuItemDetails() {
  var { menuItemId } = useParams();
  var { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, SetIsAddingToCart] = useState<boolean>(false);
  const [addOrUpdateShoppingCart] = useAddOrUpdateShoppingCartMutation();

  const handleQuantity = (counter: number) => {
    setQuantity(Math.max(1, quantity + counter));
  };

  const handleAddOrUpdateShoppingCart = async (menuItemId: number) => {
    SetIsAddingToCart(true);
    const repose = await addOrUpdateShoppingCart({
      userId: "0ee50b2d-d2a0-48d3-a51e-7264806f1cf8",
      menuItemId: menuItemId,
      quantity: quantity,
    });
    console.log(repose);
    SetIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.data?.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.data?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.data?.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.data?.description}
            </p>
            <span className="h3">${data.data?.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => handleQuantity(-1)}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                onClick={() => handleQuantity(1)}
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MiniLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddOrUpdateShoppingCart(data.data?.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.data?.image}
              width="100%"
              style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <MainLoader />
      )}
    </div>
  );
}

export default MenuItemDetails;
