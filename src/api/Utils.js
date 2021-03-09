import { ItemResponse, Category, CategoryResponse, Dataset } from "../Types";
import type { Dimension2, TableResponse } from "../Types";

export const toItemMap = (items: ItemResponse[]): Map<string, Dataset> => {
    const map: Map<string, Dataset> = new Map();

    for (const i of items) {
        map.set(i.href, toItem(i));
    }

    return map;
};

export const toItem = (itemResponse: ItemResponse): Dataset => {
    return {
        href: itemResponse.href,
        label: itemResponse.label,
        dimension: Object.values(itemResponse.dimension),
    };
};

export const toOptions = (optionsResponse: CategoryResponse): Category => {
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

export const toTableArray = (res: TableResponse) => {
    // const tableArray = [];
    const colId: string = res.role.time[0]; // todo cols array -> colIds
    const cols: Dimension2 = res.dimension[colId];
    const colNames: string[] = Object.keys(cols.category.index);
    const rowNames: string[] = [];

    for (let dimensionId of Object.keys(res.dimension)) {
        // filter out columns
        if (res.role.time.some((id) => id === dimensionId)) {
            continue;
        }
        // filter out data
        if (res.role.metric.some((id) => id === dimensionId)) {
            continue;
        }
        const rows: Dimension2 = res.dimension[dimensionId];
        Object.keys(rows.category.index).forEach((key: string) => {
            if (!!rows.category.label && !!rows.category.label[key]) {
                rowNames.push(rows.category.label[key]);
            } else {
                rowNames.push(key);
            }
        });
    }

    console.log("colNames: ", colNames);
    console.log("rowNames: ", rowNames);

    return { colNames, rowNames };
};
