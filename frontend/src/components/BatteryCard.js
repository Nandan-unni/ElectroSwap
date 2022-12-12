import React from "react";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { routes } from "../routes";

const BatteryCard = ({ station, time }) => {
  return (
    <div className="flex flex-col justify-between cursor-pointer p-4 mx-5 my-4 rounded-lg shadow-md min-h-[100px]">
      <Link href={routes.STATION(station?.pk)}>
        <h3 className="font-semibold">{station?.name}</h3>
      </Link>
      <div className="flex justify-between font-light text-sm">
        <time className="text-gray-500">
          <span className="text-themeColor">{station?.distance_msg}</span> away
          &nbsp; • &nbsp;
          <span className="text-gray-400">{station?.time_msg}</span>
        </time>
        <a
          target="_blank"
          href={`https://maps.google.com/?q=${station?.latitude},${station?.longitude}`}
          className="flex items-center justify-center"
        >
          <FeatherIcon size={18} icon="map-pin" className="mr-2" />
          View in map
        </a>
      </div>
    </div>
  );
};

export default BatteryCard;
