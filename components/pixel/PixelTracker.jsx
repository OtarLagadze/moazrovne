import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

const PixelTracker = () => {
  useEffect(() => {
    const pixelId = '1644022226318154';
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  }, []);
  return null;
};
export default PixelTracker;