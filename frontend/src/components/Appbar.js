import React from "react";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { routes } from "../routes";
import { useRouter } from "next/router";

const MenuItem = ({ label, icon, route }) => {
  const router = useRouter();
  const isActive = route === router.pathname;
  return (
    <Link href={route}>
      <div
        className={`esTrans flex flex-col items-center justify-center cursor-pointer h-[65px] w-[85px] rounded-2xl ${
          isActive ? "bg-themeLightColor text-themeColor" : "bg-transparent"
        }`}
      >
        <FeatherIcon size={22} className="text-sm" icon={icon} />
        <p className="text-[13px] mt-1">{label}</p>
      </div>
    </Link>
  );
};

const Appbar = () => {
  return (
    <div
      className={`appbar flex items-center justify-around rounded-tr-2xl rounded-tl-2xl fixed w-full h-[80px] bg-white text-sm bottom-0`}
    >
      <MenuItem label="Home" icon="home" route={routes.HOME} />
      <MenuItem label="Profile" icon="user" route={routes.PROFILE} />
      <MenuItem label="History" icon="rotate-ccw" route={routes.HISTORY} />
    </div>
  );
};

export default Appbar;
