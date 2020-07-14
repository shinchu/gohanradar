import axios from "axios";

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Google Maps API V3
const getCurrentLocationFromPosition = (coords) => {
  return new Promise((resolve, reject) => {
    return null;
  });
};

// geocoding.jp
// limit search frequency to once in 10 sec
const getCurrentPositionFromLocation = () => {
  return null;
};

export default {
  getCurrentPosition,
  getCurrentLocationFromPosition,
  getCurrentPositionFromLocation,
};
