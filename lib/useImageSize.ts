import { useEffect, useRef, useState } from "react";

import { getImageRef } from "./image";

const useImageSize = (src) => {
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef();
  
  useEffect(() => {
    const setImageSize = async () => {
      try {
        const image = await getImageRef(src);
        setImgSize({ width: image.width, height: image.height });
      } catch {
        setImgSize({ width: 0, height: 0 });
      }
    };
    setImageSize();
  }, [src]);

  return { imgSize, imgRef };
};

export default useImageSize;