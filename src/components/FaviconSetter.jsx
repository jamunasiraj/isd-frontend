import React, { useEffect } from "react";
import favicon from "../assets/images/favicon_io/favicon.ico";

const FaviconSetter = () => {
  useEffect(() => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = favicon;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  return null;
};

export default FaviconSetter;
