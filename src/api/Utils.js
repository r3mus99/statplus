import { ItemResponse, Options, OptionsResponse, Table } from "../Types";

export const toItemMap = (itemResponse: ItemResponse[]): Map<string, Table> => {
  const map: Map<string, Table> = new Map();

  for (const i of itemResponse) {
    map.set(i.href, toItem(i));
  }

  return map;
};

export const toItem = (itemResponse: ItemResponse): Table => {
  return {
    href: itemResponse.href,
    label: itemResponse.label,
    dimension: Object.values(itemResponse.dimension),
  };
};

export const toOptions = (optionsResponse: OptionsResponse): Options => {
  const label: string = optionsResponse.label;
  const note: string = optionsResponse.note;
  const category: Map<string, string> = new Map();
  Object.keys(optionsResponse.category.index).forEach((key: string) => {
    const label = optionsResponse.category.label
      ? optionsResponse.category.label[key]
      : key;
    category.set(key, label);
  });

  return { label, note, category };
};
