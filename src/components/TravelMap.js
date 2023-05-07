import React, { useContext, useEffect } from "react";
import { useState, useCallback, memo } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { mapPlace } from "../modals/GptApiContentModal";

const centerDefault = { lat: 37.55998, lng: 126.9858296 }; // center 초기값
const containerStyle = {
  width: "100%",
  height: "60vh",
};

function TravelMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBN-IU-e5RgkOxfMf1VRQGtNN99FKJb4-A",
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(centerDefault);
  const { place, setPlace } = useState({});
  //const [location, setLocation] = useState(mapPlace);

  useEffect(() => {
    console.log("---------------------");
    if (place) {
      setCenter(place);
    } else {
      setCenter(centerDefault);
    }
  }, [place]);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
      console.log("12345678");
    },
    [center]
  );
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
  ) : null;
}

// React.memo로 리렌더링 방지
export default TravelMap;
