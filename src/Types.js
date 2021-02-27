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

export type Table = {
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

// todo split into response, data and components props
