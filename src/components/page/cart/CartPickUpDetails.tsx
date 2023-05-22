import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { cartItemModel, userModel } from '../../../interfaces'
import { RootState } from '../../../storage/redux/store'
import { inputHelper } from '../../../helpers'
import { MiniLoader } from '../common'

function CartPickUpDetails() {

  const [isLoading, setIsLoading] = useState(false);
  const userDate: userModel = useSelector((state: RootState) => state.useAuthStore);
    const cartItemsFromStore: cartItemModel[] = useSelector((state: RootState) => state.shoppingCartStore.cartItems ?? [])
    let grandTotal = 0;
    let totalItems = 0;
    const initialUserData = {
      name: userDate.fullName,
      email: userDate.email,
      phoneNumber: ""
    }
    cartItemsFromStore?.map((cartItem: cartItemModel) => {
        totalItems += cartItem.quantity ?? 0;
        grandTotal += (cartItem.quantity??0) * (cartItem.menuItem?.price??0 );
    })
    const [userInput, setUserInput] = useState(initialUserData);
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tmpData = inputHelper(e, userInput);
        setUserInput(tmpData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
    }

  return (
    <div className="border pb-5 pt-3">
    <h1 style={{ fontWeight: "300" }} className="text-center text-success">
      Pickup Details
    </h1>
    <hr />
    <form onSubmit={handleSubmit} className="col-10 mx-auto">
      <div className="form-group mt-3">
        Pickup Name
        <input
          type="text"
          value={userInput.name}
          className="form-control"
          placeholder="name..."
          name="name"
          onChange={handleUserInput}
          required
        />
      </div>
      <div className="form-group mt-3">
        Pickup Email
        <input
          type="email"
          value={userInput.email}
          className="form-control"
          placeholder="email..."
          name="email"
          onChange={handleUserInput}
          required
        />
      </div>

      <div className="form-group mt-3">
        Pickup Phone Number
        <input
          type="number"
          value={userInput.phoneNumber}
          className="form-control"
          placeholder="phone number..."
          name="phoneNumber"
          onChange={handleUserInput}
          required
        />
      </div>
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: "ghostwhite" }}>
          <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
          <h5>No of items : {totalItems}</h5>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-success form-control mt-3" disabled={isLoading}
      >
        {isLoading ? <MiniLoader /> : "Looks Good? Place Order!"}
        
      </button>
    </form>
  </div>
  )
}

export default CartPickUpDetails
