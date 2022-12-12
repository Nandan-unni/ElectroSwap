import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userTypes } from "../../../common/constants";
import { AuthLabel, Button, Input } from "../../components";
import { authActions } from "../../redux/auth";
import { routes } from "../../routes";
import { validator } from "../../utils/validators";
import { message } from "antd";

const Signup = () => {
  const { isAuthenticating, vehicles } = useSelector((state) => state.auth);
  const [userType, setuserType] = useState(userTypes.consumer.key);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [vehicle, setvehicle] = useState(null);
  const [password, setpassword] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.handleListVehicles());
  }, []);

  const handleSubmit = () => {
    message.config({ maxCount: 2 });
    if (!userType || !name || !email || !password || !vehicle) {
      message.error(
        `${
          !name
            ? "Name"
            : !email
            ? "Email"
            : !vehicle
            ? "Vehicle"
            : !password
            ? "Password"
            : "User type"
        } cannot be left blank`
      );
    } else if (validator.name(name)) {
      message.error("Provide a valid name");
    } else if (validator.email(email)) {
      message.error("Provide a valid email");
    } else if (validator.string(vehicle)) {
      message.error("Provide a valid vehicle");
    } else if (validator.password(password)) {
      message.error("Provide a valid password");
    } else {
      dispatch(
        authActions.handleSignup({ name, email, vehicle, password, userType })
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthLabel />
      <div className="leafLayout flex-[3] flex flex-col items-center justify-center">
        <Link href={routes.SIGNIN}>
          <p className="text-themeColor text-lg cursor-pointer">
            Already have an account?
          </p>
        </Link>
        <div className="w-4/5">
          <h1 className="text-center my-5 text-2xl uppercase font-semibold">
            Signup
          </h1>
          <div>
            <p className="text-gray-600 font-medium">I'm a</p>
            <div className="flex w-full rounded-full overflow-hidden border-[1px] border-themeColor">
              <p
                onClick={() => setuserType("consumer")}
                className={`esTrans flex-1 h-full text-center py-2 cursor-pointer ${
                  userType === userTypes.consumer.key
                    ? "bg-themeColor text-white"
                    : "bg-white text-themeColor"
                }`}
              >
                {userTypes.consumer.label}
              </p>
              <p
                onClick={() => setuserType("producer")}
                className={`esTrans flex-1 text-center py-2 cursor-pointer ${
                  userType === userTypes.producer.key
                    ? "bg-themeColor text-white"
                    : "bg-white text-themeColor"
                }`}
              >
                {userTypes.producer.label}
              </p>
            </div>
          </div>
          <Input
            validationMsg={validator.name(name)}
            label={`Name`}
            name="name"
            placeholder={`Enter name`}
            onChange={(val) => setname(val)}
          />
          <Input
            validationMsg={validator.email(email)}
            label={`Email`}
            name="email"
            placeholder={`Enter email`}
            onChange={(val) => setemail(val)}
          />
          <Input
            validationMsg={validator.string(vehicle)}
            label={`Vehicle`}
            name={`vehicle`}
            placeholder={`Enter you vehcile`}
            onChange={(val) => setvehicle(val)}
            type="select"
            options={vehicles}
          />
          <Input
            validationMsg={validator.password(password)}
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={(val) => setpassword(val)}
          />
          <Button
            loading={isAuthenticating}
            type="solid"
            className="w-full"
            onClick={handleSubmit}
          >
            Signup as{" "}
            {userType === userTypes.consumer.key
              ? userTypes.consumer.label
              : userTypes.producer.label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
