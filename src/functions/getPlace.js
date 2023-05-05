import axios from "axios";
import React from "react";

import TravelMap from "../components/TravelMap";

export function getPlace(location) {
  axios
    .get(`http://localhost:3000/findLocation?query=${location}`) // 서버에서 location 데이터를 받아서 center 값을 변경
    .then((res) => {
      //setLocation(res.data.location);
      //<TravelMap lat={lat}, lng={lng} />
      console.log("getPlace", res.data);
      const place = res.data;
      return place;
    })
    .catch(() => {
      console.log("data error");
    });

  //console.log({ location });
}
