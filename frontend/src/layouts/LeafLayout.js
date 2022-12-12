import React from "react";
import styles from "./styles.module.css";

const LeafLayout = ({ children }) => {
  return (
    <div className={`${styles.leafLayout} flex-1 min-h-full`}>{children}</div>
  );
};

export default LeafLayout;
