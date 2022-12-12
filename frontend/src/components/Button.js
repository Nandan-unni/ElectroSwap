import Link from "next/link";
import React from "react";
import Loader from "./Loader";

const Button = ({
  children,
  className,
  onClick = () => {},
  type,
  loading,
  disabled = false,
  link = "",
}) => {
  const Wrapper = ({ children }) =>
    link ? <Link href={link}>{children}</Link> : <>{children}</>;
  return (
    <Wrapper>
      <button
        className={`flex items-center justify-center relative h-[48px] px-8 rounded-xl my-2 border-[1px] ${
          type === "gas"
            ? "border-themeColor bg-transparent text-themeColor"
            : "border-transparent bg-themeColor text-white"
        } ${className} ${
          loading || disabled ? "opacity-[0.45]" : "opacity-100"
        } ${
          disabled
            ? "cursor-not-allowed"
            : loading
            ? "cursor-progress"
            : "cursor-pointer"
        }`}
        onClick={loading || disabled ? () => {} : onClick}
      >
        {loading && <Loader size="small" className="absolute left-1/4" />}
        {children}
      </button>
    </Wrapper>
  );
};

export default Button;
