import React, { useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { Button } from "../../components";
import { BarLayout } from "../../layouts";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { stationsActions } from "../../redux/stations";
import { routes } from "../../routes";
import moment from "moment";

const TableCell = ({ label, value }) => {
  return (
    <div className="flex border-b-[1px] border-b-[#8d8d8d81] p-2">
      <b className="flex-1">{label}</b>
      <p className="flex-1">{value}</p>
    </div>
  );
};

const CompanyCell = ({ battery, isSelected, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className={`esTrans cursor-pointer flex flex-col justify-between border-2 w-fit rounded-lg p-2 m-2 min-w-[200px] min-h-[110px] ${
        isSelected ? "border-themeColor shadow-lg" : "border-gray-300"
      }`}
    >
      <div>
        <h1 className="text-themeColor font-semibold text-lg">
          {battery?.company?.name}
        </h1>
        <p className="text-gray-500">{battery?.vehicle?.name}</p>
      </div>
      <span> &#8377; {battery?.price}</span>
    </div>
  );
};

const Station = ({ location }) => {
  const router = useRouter();
  const { station, loadingStation, loadingBooking, booking } = useSelector(
    (state) => state.stations
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      stationsActions.handleGetBooking(
        router.query.id,
        location.latitude,
        location.longitude
      )
    );
  }, []);

  return (
    <BarLayout location={location}>
      {loadingStation || loadingBooking ? (
        <Spin tip="Loading booking..." />
      ) : (
        <>
          <div className="cursor-pointer" onClick={() => router.back()}>
            <FeatherIcon icon="chevron-left" className="text-gray-600 m-5" />
          </div>
          <div className="mx-5 mt-4">
            <h1 className="text-themeColor font-semibold uppercase text-2xl">
              {station?.name}
            </h1>
            <div className="my-6">
              <TableCell label={"Distance"} value={station?.distance_msg} />
              <TableCell label={"Time"} value={station?.time_msg} />
              <TableCell
                label={"Price"}
                value={`₹ ${booking?.battery?.price}`}
              />
              <TableCell
                label={"Booked At"}
                value={moment(booking?.booked_time).format(
                  "HH:mm • DD MMM yyyy"
                )}
              />
              {/* {!booking?.is_collected && (
                <TableCell
                  label={"Expires On"}
                  value={moment(booking?.expiry_time).format(
                    "HH:mm • DD MMM yyyy"
                  )}
                />
              )} */}
            </div>
            <br />
            <Button
              type="solid"
              className="w-full"
              disabled={booking?.is_collected}
              link={
                booking?.is_collected
                  ? ""
                  : booking?.is_paid
                  ? routes.SCANNER
                  : routes.STATION(booking?.station?.pk)
              }
            >
              {booking?.is_collected
                ? "Collected"
                : booking?.is_paid
                ? "Collect"
                : "Book"}
            </Button>
            <a
              target="_blank"
              href={`https://maps.google.com/?q=${station?.latitude},${station?.longitude}`}
            >
              <Button type="gas" className="w-full">
                View in map
              </Button>
            </a>
          </div>
        </>
      )}
    </BarLayout>
  );
};

export default Station;
