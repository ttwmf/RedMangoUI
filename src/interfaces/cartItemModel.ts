import { menuItemModel } from ".";

export default interface cartItemModel {
  id?: number;
  menuItem?: menuItemModel;
  quantity?: number;
  status?: number;
}
