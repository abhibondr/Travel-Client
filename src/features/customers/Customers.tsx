import * as React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditButton from "@mui/icons-material/Edit";
import DeleteButton from "@mui/icons-material/Delete";

import User from "../../shared/models/UserModel";
import UserService from "../../services/UserService";
import MuiDatatable, { MUIDataTableColumn } from "mui-datatables";
import CustomerContext from "./CustomerContext";
import AddEditUser from "./AddEditUser";
import { endpoints } from "../../api";

import Swal from "sweetalert2";

import { useSelector } from "react-redux";
import { selectAuth } from "../../app/slices/authSlice";

interface ICustomersProps {}

const Customers: React.FunctionComponent<ICustomersProps> = (props) => {
  const [customerList, setCustomerList] = React.useState<User[]>([]);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const [operation, setOperation] = React.useState<string>("add");

  const [initialCustomer, setInitialCustomer] = React.useState<User>();

  const loggedUser = useSelector(selectAuth); //current logged User

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const loadCustomers = async () => {
    const response = await UserService.getAllUsers();
    if (response?.data?.data) setCustomerList(response?.data?.data);
  };

  React.useEffect(() => {
    loadCustomers();
  }, []);

  const addUser = () => {
    setOpenDialog(true);
    setInitialCustomer({
      name: {
        first: "",
        last: "",
      },
      mobile: "",
      email: "",
      password: "",
      status: 1,
      avatar: "",
      role: "customer",
    });
    setOperation("add");
    loadCustomers();
  };

  const editUser = (user: User) => {
    setOpenDialog(true);
    setInitialCustomer(user);
    setOperation("edit");
    loadCustomers();
  };

  const deleteUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UserService.deleteUser(id)
          .then((response) => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            loadCustomers();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Not Deleted!", "User has not been deleted.", "error");
          });
      }
    });
  };

  const columns: MUIDataTableColumn[] = [
    {
      label: "ID",
      name: "userId",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Avatar",
      name: "avatar",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = customerList[index];
          return (
            <img
              style={{ width: 100, height: 100 }}
              src={
                user?.avatar
                  ? `${endpoints.serverBaseURL}/${user?.avatar}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJaEoQJ0PLbNOn_xHRIw7mcyuIOj0_hVZlA&usqp=CAU"
              }
            />
          );
        },
      },
    },
    {
      label: "Name",
      name: "name",
      options: {
        sort: true,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = customerList[index];
          return `${user?.name?.first} ${user?.name?.last} `;
        },
      },
    },

    {
      label: "Mobile",
      name: "mobile",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      label: "Role",
      name: "role",
      options: {
        sort: false,
        filter: true,
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        sort: false,
        filter: true,
        customBodyRender: (status) => {
          return status == 1 ? "Active" : "InActive";
          // return status;
        },
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const user = customerList[index];
          return (
            <>
              <IconButton color="primary" onClick={() => editUser(user)}>
                <EditButton />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteUser(user?._id as string)}
              >
                <DeleteButton />
              </IconButton>
            </>
          );
        },
      },
    },
  ];
  return (
    <>
      <CustomerContext.Provider
        value={{
          open: openDialog,
          handleClose: handleDialogClose,
          operation,
          loadCustomers,
          initialCustomer,
        }}
      >
        <AddEditUser />
      </CustomerContext.Provider>

      <Button variant="contained" onClick={addUser}>
        New +
      </Button>
      <MuiDatatable
        title="Customer List"
        // data={customerList?.filter((u) => u?._id != loggedUser?._id)}
        data={customerList}
        columns={columns}
      />
    </>
  );
};

export default Customers;
