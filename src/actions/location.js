import axios from "axios";

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// HeartRails Geo API
// TODO: Add credit
export const getCurrentLocationFromPosition = (coords) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://geoapi.heartrails.com/api/json?method=searchByGeoLocation", {
        params: {
          x: coords.latitude,
          y: coords.longitude,
        },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        console.log(err);
        reject("現在地");
      });
  });
};

// geocoding.jp
// limit search frequency to once in 10 sec
// TODO: Add credit
export const getCurrentPositionFromLocation = (location) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://geocoding.jp/api/?q=${location}`, {
        responseType: "document",
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        console.log(err);
        reject("現在地を取得できませんでした");
      });
  });
};
