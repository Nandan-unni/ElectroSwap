import React from "react";
import styles from "./styles.module.css";

const AuthLabel = () => {
  return (
    <div
      className={`${styles.authLabel} w-full relative flex-[1.5] text-white flex flex-col items-center justify-center rounded-bl-[115px]`}
    >
      {/* <div className="flex flex-col items-center justify-center h-full w-full"> */}
      <img src="/static/logo.svg" alt="logo" />
      <h1 className="text-[40px]">ElectroSwap</h1>
      <h4 className="text-sm uppercase tracking-[0.2rem]">Swap on the go</h4>
      {/* </div> */}
      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        src="/static/zap.svg"
        alt="zap"
      />
    </div>
  );
};

export default AuthLabel;
