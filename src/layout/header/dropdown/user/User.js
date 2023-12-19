import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../../redux/store/services/auth/store";
import { clearProfile } from "../../../../redux/store/services/profile/store/profile-actions";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import { LuUser } from "react-icons/lu";

const User = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);


  useEffect(()=>{
    console.log('profile changed!', profile)
  }, [profile])

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearToken())
    dispatch(clearProfile())
    navigate(`/login`);
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <UserAvatar icon="user-alt" className="sm" />
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{profile.fullname || 'کاربر عادی'}</span>
              <span className="sub-text">{profile.email || 'info@fouladyargroup.ir'}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link={`/profile/me/1`} icon={<LuUser  size={17} color={"#526484"}/>} onClick={toggle}>
              مشاهده پروفایل
            </LinkItem>
            <LinkItem link="/settings" icon={<MdOutlineSettings size={17} color={"#526484"}/>} onClick={toggle}>
              تنظیمات حساب
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a onClick={handleSignout}>
              <MdOutlineLogout  size={17} color={"#526484"}/>
              <span>خروج از حساب</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
