import React, { useEffect } from "react";
import { useState, useCallback, memo } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import GptApiContentModal1 from "../modals/GptApiContentModal";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

/*const center = {
  lat: 37.5642135,
  lng: 127.0016985,
};*/

function TravelMap(location) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBN-IU-e5RgkOxfMf1VRQGtNN99FKJb4-A",
  });

  const [center, setCenter] = useState();
  useEffect(() => {
    setCenter(location);
  }, [center]);

  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MarkerF position={center} />
      {/* Child components, such as markers, info windows, etc. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

// React.memo로 리렌더링 방지
export default memo(TravelMap);
