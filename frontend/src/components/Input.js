import Link from "next/link";
import React from "react";

const Input = ({
  name = "",
  helperLink,
  label,
  placeholder,
  value,
  validationMsg = "",
  type = "text",
  onChange = (val) => {},
  options = [],
}) => {
  const inputProps = {
    name: name,
    id: name,
    type: type,
    value: value,
    placeholder: placeholder,
    defaultValue: value,
    onChange: (e) => onChange(e.target.value),
    className: `outline-none bg-white h-[45px] w-full $,
    validationMsg
      ? "mb-0 mt-1 border-[#ff6347] active:border-[#ff6347] focus:border-[#ff6347]"
      : "my-1 border-[#cacaca] active:border-themeColor focus:border-themeColor"
  } my-1 px-4 border-[1.5px] rounded-xl`,
  };

  return (
    <div className="flex flex-col w-full my-3">
      <label
        htmlFor={name}
        className={`${
          validationMsg ? "text-[#ff6347]" : "text-gray-600"
        } font-medium`}
      >
        {label}
      </label>
      {type === "select" ? (
        <select {...{ ...inputProps }}>
          <option disabled value="">
            {placeholder}
          </option>
          {options?.map((opt) => (
            <option key={opt?.pk} value={opt?.pk}>
              {opt?.name}
            </option>
          ))}
        </select>
      ) : (
        <input {...{ ...inputProps }} />
      )}
      {validationMsg && (
        <p className="text-[#ff6347] text-sm ml-1">{validationMsg}</p>
      )}
      {helperLink && (
        <Link href={helperLink?.link}>
          <p className="text-themeColor font-thin text-right text-sm">
            {helperLink?.label}
          </p>
        </Link>
      )}
    </div>
  );
};

export default Input;
