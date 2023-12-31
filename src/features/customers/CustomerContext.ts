import { createContext } from "react";
import User from "../../shared/models/UserModel";

interface IUserContext {
  handleClose: () => void;
  loadCustomers: () => void;
  open: boolean;
  operation: string;
  initialCustomer?: User;
}

const CustomerContext = createContext<IUserContext>({
  open: false,
  operation: "add",
  handleClose: () => {},
  loadCustomers: () => {},
});

export default CustomerContext;
