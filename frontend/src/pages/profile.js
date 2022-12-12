import React, { useEffect, useState } from "react";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../components";
import { BarLayout } from "../layouts";
import FeatherIcon from "feather-icons-react";
import { message, Modal, Spin } from "antd";
import { routes } from "../routes";
import { Cache } from "../../infrastructure/common/cache";
import { authActions } from "../redux/auth";
import { validator } from "../utils/validators";

const Profile = ({ location }) => {
  const { profile, vehicles, profileLoading, profileUpdating } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      okText: "Logout",
      okButtonProps: { type: "danger" },
      centered: true,
      onOk: () => {
        Cache.removeItem("accessToken");
        Cache.removeItem("refreshToken");
        Cache.removeItem("user");
        router.push(routes.INITIAL);
      },
    });
  };

  const handleSubmit = () => {
    message.config({ maxCount: 2 });
    if (!name || !phone || !vehicle) {
      message.error(
        `${
          !name ? "Name" : !vehicle ? "Vehicle" : !phone ? "Phone" : ""
        } cannot be left blank`
      );
    } else if (validator.name(name)) {
      message.error("Provide a valid name");
    } else if (validator.phone(phone)) {
      message.error("Provide a valid phone");
    } else if (validator.string(vehicle)) {
      message.error("Provide a valid vehicle");
    } else {
      dispatch(authActions.handleUpdateProfile({ name, phone, vehicle }));
    }
  };

  useEffect(() => {
    dispatch(
      authActions.handleGetProfile((resData) => {
        dispatch(authActions.handleListVehicles());
        setName(resData?.name);
        setPhone(resData?.phone);
        setVehicle(resData?.vehicle?.pk);
      })
    );
  }, []);

  return (
    <BarLayout location={location}>
      {profileLoading ? (
        <Spin tip="Loading profile..." />
      ) : (
        <>
          <div
            onClick={handleLogout}
            className="bg-themeColor absolute right-5 flex items-center justify-center rounded-full text-white h-8 w-8"
          >
            <FeatherIcon size={18} icon="log-out" />
          </div>
          <div className="mx-5 mt-4">
            <img
              src="/static/default.jpeg"
              className="rounded-full w-40 h-40 m-auto"
              alt="dp"
            />
            <Input
              validationMsg={validator.name(name)}
              label="Name"
              name="name"
              placeholder="Update your name"
              value={name}
              placeholder={`Update you vehcile`}
              onChange={(val) => setName(val)}
            />
            <Input
              validationMsg={validator.phone(phone)}
              name="phone"
              label="Phone Number"
              placeholder={`Update you phone`}
              onChange={(val) => setPhone(val)}
              placeholder="Update your Phone Number"
              value={phone}
            />
            <Input
              validationMsg={validator.string(vehicle)}
              label={`Vehicle`}
              name={`vehicle`}
              placeholder={`Update you vehcile`}
              onChange={(val) => setVehicle(val)}
              type="select"
              value={vehicle}
              options={vehicles}
            />
            <Button
              type="solid"
              className="w-full"
              onClick={handleSubmit}
              loading={profileUpdating}
            >
              Save changes
            </Button>
          </div>
        </>
      )}
    </BarLayout>
  );
};

export default Profile;
