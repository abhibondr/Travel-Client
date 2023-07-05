import { lazy } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CustomerIcon from "@mui/icons-material/People";
import DestinationIcon from "@mui/icons-material/Place";

const Dashboard = lazy(() => import("../../features/dashboard/Dashboard"));
const Customers = lazy(() => import("../../features/customers/Customers"));
const Destination = lazy(
  () => import("../../features/destinations-master/DestinationMaster")
);

export default [
  {
    label: "Dashboard",
    component: <Dashboard />,
    icon: <DashboardIcon />,
    showInMenu: true,
    hasChildren: false,
    roles: ["admin", "customer"],
    path: "",
  },
  {
    label: "Customers",
    component: <Customers />,
    icon: <CustomerIcon />,
    showInMenu: true,
    hasChildren: false,
    roles: ["admin"],
    path: "customers",
  },
  {
    label: "Destinations",
    component: <Destination />,
    icon: <DestinationIcon />,
    showInMenu: true,
    hasChildren: true,
    roles: ["admin", "customer"],
    path: "destinations",
  },
];
