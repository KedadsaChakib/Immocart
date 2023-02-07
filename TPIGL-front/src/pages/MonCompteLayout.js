import { Outlet, Link } from "react-router-dom";

import MenuBar from "../components/MenuBar";
import LogedNavBar from "../components/LogedNavBar";
const MonCompteLayout = () => {
  return (
    <>
      <LogedNavBar />
      <MenuBar />
      <Outlet />
    </>
  )
};

export default MonCompteLayout;