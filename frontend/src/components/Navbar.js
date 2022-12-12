import React from "react";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";

const NavbarItem = ({ text, icon, className = "" }) => {
  return (
    <div className={`${className} text-themeColor flex items-center flex-row`}>
      <div
        className={`bg-themeColor text-white h-8 w-8 flex items-center justify-center rounded-full mr-3`}
      >
        <FeatherIcon size={18} icon={icon} />
      </div>
      <p className={`text-sm max-w-[250px]`}>{text}</p>
    </div>
  );
};

const Navbar = ({ location }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-between items-center bg-themeLightColor h-14 px-4">
      <NavbarItem text={location?.name} icon="map-pin" />
      <NavbarItem text={user?.meta_data?.vehicle?.name} icon="truck" />
    </div>
  );
};

export default Navbar;
