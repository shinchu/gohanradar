import axios from "axios";

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true
    });
  });
};

// NARO
export const getCurrentLocationFromPosition = (coords) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php", {
        params: {
          json: true,
          lon: coords.longitude,
          lat: coords.latitude,
        },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// GSI
// https://github.com/gsi-cyberjapan/geojson-with-style-spec
export const getCurrentPositionFromLocation = (location) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://msearch.gsi.go.jp/address-search/AddressSearch?q=${location}`)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
