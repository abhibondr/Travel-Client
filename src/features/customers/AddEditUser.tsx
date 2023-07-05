import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UserForm from "./UserForm";
import CustomerContext from "./CustomerContext";

interface IAddEditUserProps {}

const AddEditUser: React.FunctionComponent<IAddEditUserProps> = (props) => {
  const { open, handleClose, operation } = React.useContext(CustomerContext);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>{operation == "edit" ? "Edit" : "Add"} User</DialogTitle>
      <DialogContent>
        <UserForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;
