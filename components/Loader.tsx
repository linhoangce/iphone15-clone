import { Html } from "@react-three/drei";
import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <Html>
      <div className="loader">
        <Image
          src="/assets/images/loader.svg"
          alt="loader"
          width={32}
          height={32}
          className="animate-spin"
        />
        Loading...
      </div>
    </Html>
  );
};

export default Loader;
