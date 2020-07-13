import axios from "axios";

const GNAVI_API_URL = "https://api.gnavi.co.jp/RestSearchAPI/v3/";
const API_KEY = process.env.REACT_APP_GNAVI_API_KEY;

const getRestaurants = (coords, distRange, perPage, page) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${GNAVI_API_URL}?keyid=${API_KEY}`, {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          range: distRange,
          hit_per_page: perPage,
          offset_page: page,
        },
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        const errorStatus = err.response.status;

        switch (errorStatus) {
          case 400:
            reject("不正なパラメータが指定されました");
            break;

          case 401:
            reject("不正なアクセスです");
            break;

          case 404:
            reject("お店が見つかれませんでした");
            break;

          case 405:
            reject("不正なアクセスです");
            break;

          case 429:
            reject("リクエスト回数上限超過");
            break;

          case 500:
            reject("処理中にエラーが発生しました");
            break;

          default:
            reject("エラーが発生しました");
            break;
        }
      });
  });
};

export default getRestaurants;
