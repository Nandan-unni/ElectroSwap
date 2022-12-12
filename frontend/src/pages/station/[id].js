import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import { Button } from "../../components";
import { BarLayout } from "../../layouts";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import actions from "../../redux/stations/actions";
import { stationsActions } from "../../redux/stations";

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
  const { station, loadingStation, bookingStation } = useSelector(
    (state) => state.stations
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedCompany, setselectedCompany] = useState(null);

  useEffect(() => {
    dispatch(
      actions.handleGetStation(
        router.query.id,
        location.latitude,
        location.longitude
      )
    );
  }, []);

  return (
    <BarLayout location={location}>
      {loadingStation ? (
        <Spin tip="Loading station..." />
      ) : (
        <>
          <div className="cursor-pointer" onClick={() => router.back()}>
            <FeatherIcon icon="chevron-left" className="text-gray-600 m-5" />
          </div>
          <div className="mx-5 mt-4">
            <h1 className="text-themeColor font-semibold uppercase text-2xl">
              {station?.name}
            </h1>
            <div className="mt-6">
              <TableCell label={"Distance"} value={station?.distance_msg} />
              <TableCell label={"Time"} value={station?.time_msg} />
            </div>
            <div className="flex justify-center flex-wrap my-8">
              {station?.batteries?.filter(
                (battery) =>
                  battery?.vehicle?.pk === user?.meta_data?.vehicle?.pk
              )?.length > 0 ? (
                station?.batteries
                  ?.filter(
                    (battery) =>
                      battery?.vehicle?.pk === user?.meta_data?.vehicle?.pk
                  )
                  ?.map((battery) => (
                    <CompanyCell
                      onClick={() => setselectedCompany(battery?.pk)}
                      key={battery?.pk}
                      battery={battery}
                      isSelected={battery?.pk === selectedCompany}
                    />
                  ))
              ) : (
                <p>No Batteries available</p>
              )}
            </div>
            <Button
              type="solid"
              className="w-full"
              disabled={selectedCompany === null}
              loading={bookingStation}
              onClick={() =>
                dispatch(
                  stationsActions.handleBookBattery({
                    battery: selectedCompany,
                    station: parseInt(router.query.id),
                  })
                )
              }
            >
              Pay{" "}
              {selectedCompany && (
                <>
                  &#8377;{" "}
                  {
                    station?.batteries?.find(
                      (battery) => battery?.pk === selectedCompany
                    )?.price
                  }
                </>
              )}{" "}
              and Book
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
