// import { action, observable } from 'mobx';
import { makeAutoObservable } from "mobx";
import { Dataset, Category } from "../Types";
import { getDatasetId } from "./StoreUtils";

export class TableDataStore {
    dataset: Map<string, Dataset> = new Map(); // table data indexed by href (unique)
    categories: Map<string, Category> = new Map();

    selectedDataset: string = "";
    selectedCategories: Map<string, string[]> = new Map();

    datasetNote: string = "";
    response: any = []; // todo TEMP

    constructor() {
        makeAutoObservable(this);
    }

    setDataset(map: Map<string, Dataset>) {
        this.dataset = map;
    }

    getDataset(): Dataset[] {
        return Array.from(this.dataset.values()); // not optimal, creates copy
    }

    addCategories(o: Category) {
        this.categories.set(o.label, o);
    }

    selectDataset(table: string) {
        this.selectedDataset = table;
    }

    getSelectedDataset(): Dataset | undefined {
        return this.dataset.get(this.selectedDataset);
    }

    getSelectedDatasetId(): string | undefined {
        return this.selectedDataset
            ? getDatasetId(this.selectedDataset)
            : undefined;
    }

    selectOptions(dim: string, options: string[]) {
        this.selectedCategories.set(dim, options);
    }

    clearSelectedOptions() {
        this.selectedCategories.clear();
    }

    getSelectedCategories(): string[] {
        return Array.from(this.selectedCategories.values());
    }

    setResponse(res: any) {
        this.response = res;
    }
}
