import React from "react";
import FeatherIcon from "feather-icons-react";

const Message = ({ status = "info", message = "" }) => {
  return (
    <div
      className={`esTrans flex items-center overflow-hidden w-fit h-fit px-2 py-1 m-auto border-[1px] text-sm rounded-full ${
        status === "info"
          ? "bg-[#1e90ff1a] text-[#1e90ff] border-[#1e8fff99]"
          : status === "success"
          ? "bg-[#0080001a] text-[#008000] border-[#00800099]"
          : status === "error"
          ? "bg-[#ff63471a] text-[#ff6347] border-[#ff634799]"
          : "bg-[#ffd9001a] text-[#ffd900] border-[#ffd90099]"
      }`}
    >
      <FeatherIcon
        className={"mr-2"}
        size={18}
        icon={
          status === "info"
            ? "info"
            : status === "success"
            ? "check-circle"
            : status === "error"
            ? "x-circle"
            : "hexagon"
        }
      />
      {message}
    </div>
  );
};

export default Message;
