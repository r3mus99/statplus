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

export const getData = (
    table: string,
    options: string[],
    onSuccess: (res: any) => void,
    language: string = "sk",
    type: string = 'json'
) => {
    // https://data.statistics.sk/api/v2/dataset/bv3002rr/SK0/2011/MIESTNOST_01/OBYVATEL_01?lang=sk&type=json
    axios
        .get(
            `https://data.statistics.sk/api/v2/dataset/${table}/${options.join(
                "/"
            )}?lang=${language}&type=${type}`
        )
        .then((res) => onSuccess(res.data))
        .catch((err) => console.error(err));
};
