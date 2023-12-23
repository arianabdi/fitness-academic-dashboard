import React from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import User from "./dropdown/user/User";
import Notification from "./dropdown/notification/Notification";
import { useTheme, useThemeUpdate } from '../provider/Theme';
import { IoMenuOutline } from "react-icons/io5";

const Header = ({ fixed, className }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className,
  });
  let currentUrl;

  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }
  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            {/*<Toggle className="nk-nav-toggle nk-quick-nav-icon" icon="menu" click={} />*/}
            <div onClick={themeUpdate.sidebarVisibility} style={{padding: "0px 10px"}}>
              <IoMenuOutline size={30} color={"#000"}/>
            </div>
          </div>

          <div className="nk-header-app-name">
            <div className="nk-header-app-logo">
              <div className="">فیتنس آکادمیک</div>
            </div>
          </div>



          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="notification-dropdown me-n1" onClick={themeUpdate.sidebarVisibility}>
                <Notification />
              </li>
              <li className="user-dropdown" onClick={themeUpdate.sidebarVisibility}>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
