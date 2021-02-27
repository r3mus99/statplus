import { Table, ItemResponse } from "../Types";

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
