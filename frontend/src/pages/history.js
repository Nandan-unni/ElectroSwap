import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HistoryCard } from "../components";
import { BarLayout } from "../layouts";
import { stationsActions } from "../redux/stations";

const History = ({ location }) => {
  const { bookings, loadingBookings } = useSelector((state) => state.stations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stationsActions.handleListBookings());
  }, []);

  return (
    <BarLayout location={location}>
      {loadingBookings ? (
        <Spin tip="Loading History..." />
      ) : (
        bookings?.map((booking) => (
          <HistoryCard key={booking?.pk} item={booking} />
        ))
      )}
    </BarLayout>
  );
};

export default History;
