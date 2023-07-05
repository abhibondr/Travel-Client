import React, { lazy } from "react";

import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Password";
import DestinationIcon from "@mui/icons-material/Place";
import SignUpIcon from "@mui/icons-material/SignLanguage";

const HomePage = lazy(() => import("../../features/home/HomePage"));
const LoginPage = lazy(() => import("../../features/login/LoginPage"));

const DestinationsPage = lazy(
  () => import("../../features/destinations/Destinations")
);

const ForgotPassword = lazy(
  () => import("../../features/forgot-password/ForgotPassword")
);

const ChangePassword = lazy(
  () => import("../../features/change-password/ChangePassword")
);

const SignUpPage = lazy(() => import("../../features/signUp/SignUpForm"));

export default [
  {
    label: "Home",
    component: <HomePage />,
    icon: <HomeIcon />,
    showInMenu: true,
    hasChildren: false,
    path: "/",
  },
  {
    label: "Destinations",
    component: <DestinationsPage />,
    icon: <DestinationIcon />,
    showInMenu: true,
    hasChildren: true,
    path: "destinations",
  },
  {
    label: "Login",
    component: <LoginPage />,
    icon: <LoginIcon />,
    showInMenu: true,
    hasChildren: false,
    path: "login",
  },
  {
    label: "Forgot Password",
    component: <ForgotPassword />,
    icon: <LoginIcon />,
    showInMenu: false,
    hasChildren: false,
    path: "forgot-password",
  },
  {
    label: "Change Password",
    component: <ChangePassword />,
    icon: <LoginIcon />,
    showInMenu: false,
    hasChildren: false,
    path: "change-password/:token",
  },
  {
    label: "Sign Up",
    component: <SignUpPage />,
    icon: <SignUpIcon />,
    showInMenu: false,
    hasChildren: false,
    path: "signup",
  },
];
