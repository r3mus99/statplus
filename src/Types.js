export type OptionsResponse = {
    version: string, // "2.0",
    class: string, // "dimension",
    label: string, // "np3106rr_dim1",
    note: string, // "Klasifikácia zamestnaní (SKISCO-08) - triedy",
    category: {
        index: { [key: string]: number },
        label?: { [key: string]: string },
    },
};

export type Dimension = {
    label: string, // nuts13
    note: string, // 0 SR + Oblasti + Kraje
    href: string, // https://data.statistics.sk/api/v2/dimension/bv3001rr/nuts13?lang=sk
    elements?: OptionsResponse, // todo change type
};

export type Dimension2 = {
    label: string, // "en2001rs_rok",
    note: string, // "Rok",
    category: {
        index: { [key: string]: number },
        label?: { [key: string]: string },
    },
};

export type Dataset = {
    href: string, // https://data.statistics.sk/api/v2/dataset/bv3001rr/nuts13/bv3001rr_rok/bv3001rr_voda/bv3001rr_kup/bv3001rr_toa/bv3001rr_mies?lang=sk
    label: string, // Obývané byty podľa počtu obytných miestností, prístupu k tečúcej vode a hygiene
    dimension: Array<Dimension>,
};

export type ItemResponse = {
    class: string,
    href: string,
    label: string,
    update: string,
    dimension: { [key: string]: Dimension },
};

export type Options = {
    label: string, // "np3106rr_dim1",
    note: string, // "Klasifikácia zamestnaní (SKISCO-08) - triedy",
    category: Map<string, string>, // "0": "Príslušníci ozbrojených síl",
};

export type TableResponse = {
    version: string, // "2.0",
    class: string, // "dataset",
    label: string, // "Bilancia elektriny",
    update: string, // "2020-12-30",
    note: string, // "--Popis obsahu tabuľky: ...
    href: string, // "http://datacube.statistics.sk/#!/view/sk/VBD_SLOVSTAT/en2001rs/v_en2001rs_00_00_00_sk",
    id: string[], // ["en2001rs_rok", "en2001rs_ukaz", "en2001rs_data"]
    size: number[], // [3, 2, 1]
    role: {
        time: string[], // ["en2001rs_rok"]
        metric: string[], // ["en2001rs_data"]
    },
    dimension: { [key: string]: Dimension2 },
    value: number[],
};

// todo split into response, data and components props
