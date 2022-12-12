import React, { useEffect } from "react";
import { BatteryCard } from "../components";
import { BarLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { stationsActions } from "../redux/stations";
import ScanButton from "../components/ScanButton";

const Home = ({ location }) => {
  const { stationList, loadingList } = useSelector((state) => state.stations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      stationsActions.handleListStations(location.latitude, location.longitude)
    );
  }, []);

  return (
    <BarLayout location={location}>
      {loadingList ? (
        <Spin tip="Loading stations..." />
      ) : (
        stationList?.map((station, i) => (
          <BatteryCard station={station} key={i} />
        ))
      )}
      <ScanButton />
    </BarLayout>
  );
};

export default Home;
