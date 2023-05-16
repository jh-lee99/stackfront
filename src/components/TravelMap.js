import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const centerDefault = { lat: 37.55998, lng: 126.9858296 }; // center 초기값, 현재 위치를 받아 오지 못할경우 나타는 좌표

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
  const [center, setCenter] = useState(centerDefault); // 지도에 나타나는 좌표
  const [error, setError] = useState();

  const onSuccess = (pos) => {
    // 현재 위치를 받아오는데 성공하면 실행되는 함수
    const { latitude, longitude } = pos.coords;
    setCenter({
      lat: latitude,
      lng: longitude,
    });
  };

  const onError = (error) => {
    // 현재 위치를 받는데 실패하면 에러 메시지 출력
    setError(error.message);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError); // 처음 마운트 되었을 때 현재 위치를 받아오는함수
  }, []);

  useEffect(() => {
    // 결과에서 장소를 클릭할때마다 center 값을 변경
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
    },
    [center]
  );
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="setCenter">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
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
