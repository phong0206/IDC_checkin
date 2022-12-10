import { lazy } from "react";

const Home = lazy(() => import("./views/Home"));
const LayoutAdmin = lazy(() => import("./views/Admin"));
const User = lazy(() => import("./views/Admin/user"));
const AddUser = lazy(() => import("./views/Admin/user/AddUser"));
const EditUser = lazy(() => import("./views/Admin/user/EditUser"));
const Login = lazy(() => import("./views/Login"));

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/admin",
    exact: true,
    component: LayoutAdmin,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
  },
  {
    path: "/user",
    exact: true,
    component: User,
  },
  {
    path: "/add-user",
    exact: true,
    component: AddUser,
  },
  {
    path: "/edit-user/:id",
    exact: true,
    component: EditUser,
  },
  {
    path: "/:id",
    exact: false,
    component: Home,
  },
];
