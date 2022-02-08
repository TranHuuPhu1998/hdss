import _get from "lodash/get";
import Script from "next/script";
import React, { useState } from "react";

const HDSSPage = () => {
  const [md5, setMd5] = useState(null);

  return (
    <>
      <Script id="lottie-id" src="/asset/js/lottie.min.js" />
      <Script id="jsqr-id" src="/asset/js/jsQR.js" />
      <Script id="vnptbrowser-id" src="/asset/js/VNPTBrowserSDKAppV2.3.3.js" />
      <Script
        id="md5-id"
        src="/asset/js/md5.min.js"
        onLoad={() => {
          const md5 = _get(window, "md5");
          setMd5(md5);
        }}
      />
    </>
  );
};

export default HDSSPage;
