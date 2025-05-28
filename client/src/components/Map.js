import React, { memo } from "react";
import GoogleMapReact from "google-map-react";
import icons from "../ultils/icons";

const { FaLocationDot } = icons;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ coords }) => {
  if (!coords || !coords.lat || !coords.lng) {
    return <div>Đang tải bản đồ...</div>; // Hoặc có thể để null
  }

  return (
    <div className="h-[300px] w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyADtbOqkdMIB97KHSA0A9gBzUuxoqSe1MU",
        }}
        defaultCenter={coords}
        defaultZoom={14}
        center={coords}
      >
        <AnyReactComponent
          lat={coords.lat}
          lng={coords.lng}
          text={<FaLocationDot color="red" size={24} />}
        />
      </GoogleMapReact>
    </div>
  );
};

export default memo(Map);
