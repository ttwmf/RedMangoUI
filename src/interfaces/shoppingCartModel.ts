import cartItemModel from "./cartItemModel"


export default interface shoppingCartModel {
    userId?: string
    cartItems?: cartItemModel[]
    stripePaymentItentId?: any
    clientSecret?: any
    cartTotal?: number
    id?: number
  }