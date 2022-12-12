import moment from "moment";
import FeatherIcon from "feather-icons-react";
import React from "react";
import Link from "next/link";
import { routes } from "../routes";

const HistoryCard = ({ item }) => {
  return (
    <Link href={routes.ORDER_DETAILS(item?.pk)}>
      <div className="flex flex-col justify-between cursor-pointer p-4 mx-5 my-4 rounded-lg shadow-md min-h-[100px]">
        <time className="text-gray-400 text-xs">
          {moment(item?.booked_time).format("HH:mm • DD MMM yyyy")}
        </time>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg text-themeColor">{item?.station?.name}</h2>
            <div className="my-1"></div>
            <footer className="flex items-center justify-between text-sm text-gray-700">
              <p>₹ {item?.battery?.price}</p>
            </footer>
          </div>

          <div>
            {item?.is_collected ? (
              <div>
                <h3 className="text-green-600">Collected</h3>
              </div>
            ) : item?.is_paid ? (
              <div className="text-center">
                <h3 className="text-[#1E90FF] uppercase font-semibold">Paid</h3>
                <p className="text-xs text-gray-500">Not Collected</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HistoryCard;
