import React, { useEffect } from "react";
import { useState, useCallback, memo } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

function TravelMap(place = { lat: 37.55998, lng: 126.9858296 }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBN-IU-e5RgkOxfMf1VRQGtNN99FKJb4-A",
  });

  const [center, setCenter] = useState({ lat: 37.55998, lng: 126.9858296 });

  useEffect(() => {
    setCenter(place);
    console.log("ddd", place);
  }, [place]);

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
export default TravelMap;
