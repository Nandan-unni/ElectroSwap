import { message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userTypes } from "../../../common/constants";
import { AuthLabel, Button, Input } from "../../components";
import { authActions } from "../../redux/auth";
import { routes } from "../../routes";
import { validator } from "../../utils/validators";

const Signin = () => {
  const { isAuthenticating } = useSelector((state) => state.auth);
  const [typeBtnLoading, setTypeBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const [email, setemail] = useState(null);
  const [userType, setuserType] = useState(userTypes.consumer.key);
  const [password, setpassword] = useState(null);

  const handleSubmit = () => {
    message.config({ maxCount: 2 });
    if (!email || !password) {
      message.error(
        `${
          !email ? "Email" : !password ? "Password" : "Fields"
        } cannot be left blank`
      );
    } else if (validator.email(email)) {
      message.error("Provide a valid email");
    } else if (validator.password(password)) {
      message.error("Provide a valid password");
    } else {
      dispatch(authActions.handleSignin({ email, password }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthLabel />
      <div className="leafLayout flex-[3] flex flex-col items-center justify-center">
        <Link href={routes.SIGNUP}>
          <p className="text-themeColor text-lg cursor-pointer">
            New{" "}
            {userType === userTypes.consumer.key
              ? userTypes.consumer.label
              : userTypes.producer.label}
            ?
          </p>
        </Link>
        <div className="w-4/5">
          <h1 className="text-center my-5 text-2xl uppercase font-semibold">
            Login
          </h1>
          <Input
            validationMsg={validator.email(email)}
            onChange={(val) => setemail(val)}
            label={`${
              userType === userTypes.consumer.key
                ? userTypes.consumer.label
                : userTypes.producer.label
            } Email`}
            name="email"
            placeholder={`Enter ${
              userType === userTypes.consumer.key
                ? userTypes.consumer.label.toLowerCase()
                : userTypes.producer.label.toLowerCase()
            } email`}
          />
          <Input
            validationMsg={validator.password(password)}
            onChange={(val) => setpassword(val)}
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            // helperLink={{
            //   label: "Forgot Password?",
            //   link: routes.FORGOT_PASSWORD,
            // }}
          />
          <Button
            loading={isAuthenticating}
            type="solid"
            className="w-full"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div className="flex items-center justify-between">
            <div className="h-[2px] w-full mx-4 bg-themeColor opacity-20"></div>
            Or
            <div className="h-[2px] w-full mx-4 bg-themeColor opacity-20"></div>
          </div>
          <Button
            type="gas"
            className="w-full"
            onClick={() => {
              setTypeBtnLoading(true);
              setTimeout(
                () =>
                  setuserType(
                    userType === userTypes.consumer.key
                      ? userTypes.producer.key
                      : userTypes.consumer.key
                  ),
                500
              );
            }}
            loading={typeBtnLoading}
          >
            Login as{" "}
            {userType === userTypes.consumer.key
              ? userTypes.producer.label
              : userTypes.consumer.label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
