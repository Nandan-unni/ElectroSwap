import { Spin } from "antd";
import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { QrReader } from "react-qr-reader";
import { BarLayout } from "../layouts";
import { useRouter } from "next/router";
// import "./index.scss";

const QR = () => {
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleError = (error) => {
    console.log("error", error);
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      console.log(data);
    }
  };

  return (
    <BarLayout>
      <div className="cursor-pointer" onClick={() => router.back()}>
        <FeatherIcon icon="chevron-left" className="text-gray-600 m-5" />
      </div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        onError={handleError}
        className="w-10/12 m-auto border-[1px] border-gray-200 rounded-xl"
        constraints={{
          facingMode: {
            ideal: "environment",
          },
        }}
        delay={300}
      />
      <div className="flex items-center justify-center mt-12">
        {!result && <Spin tip=" Scanning" className="m-auto" />}
      </div>
    </BarLayout>
  );
};

export default QR;
