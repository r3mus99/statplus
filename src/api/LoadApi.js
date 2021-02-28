import axios from "axios";

export const getCollection = (
  onSuccess,
  onFinally,
  language: string = "sk"
) => {
  axios
    .get(`https://data.statistics.sk/api/v2/collection?lang=${language}`)
    .then((res) => onSuccess(res.data))
    .catch((err) => console.error(err))
    .finally(onFinally);
};

export const getUrl = (url: string, onSuccess: (res: any) => void) => {
  axios
    .get(url)
    .then((res) => onSuccess(res.data))
    .catch((err) => console.error(err));
};
