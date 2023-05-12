import React, { useEffect } from "react";
import { useState, useCallback, memo } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const centerDefault = { lat: 37.55998, lng: 126.9858296 }; // center 초기값

const containerStyle = {
  width: "80%",
  height: "60vh",
};

function TravelMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBN-IU-e5RgkOxfMf1VRQGtNN99FKJb4-A",
  });

  const [map, setMap] = useState(null);
  const place = useSelector((state) => state.MapReducer.mapPlace);
  const [center, setCenter] = useState(centerDefault);

  useEffect(() => {
    setCenter(place);
  }, [place]);
  useEffect(() => {
    console.log("center", center);
  }, [center]);

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
    <div style={{ display: "flex", justifyContent: "center" }}>
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
    </div>
  ) : null;
}

export default TravelMap;
