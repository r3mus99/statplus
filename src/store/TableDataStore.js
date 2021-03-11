// import { action, observable } from 'mobx';
import { makeAutoObservable } from "mobx";
import { Dataset, Category } from "../Types";
import { getDatasetId } from "./StoreUtils";

export class TableDataStore {
    dataset: Map<string, Dataset> = new Map(); // table data indexed by href (unique)
    dimensions: Map<string, Category> = new Map();

    selectedDataset: string = "";
    selectedDimensions: Map<string, string[]> = new Map();

    response: any = undefined; // todo TEMP

    constructor() {
        makeAutoObservable(this);
    }

    setDataset(map: Map<string, Dataset>) {
        this.dataset = map;
    }

    getDataset(): Dataset[] {
        return Array.from(this.dataset.values()); // not optimal, creates copy
    }

    addDimensions(o: Category) {
        this.dimensions.set(o.label, o);
    }

    getDimensionLabel(dimensionId: string) {
        if (this.dimensions.has(dimensionId)) {
            return this.dimensions.get(dimensionId).note;
        } else {
            return dimensionId;
        }
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

    selectDimension(dim: string, options: string[]) {
        this.selectedDimensions.set(dim, options);
    }

    clearSelectedDimensions() {
        this.selectedDimensions.clear();
    }

    getSelectedDimensions(): string[] {
        return Array.from(this.selectedDimensions.values());
    }

    setResponse(res: any) {
        this.response = res;
    }

    getResponseTable() {
        return !this.response ? [] : this.response.toTable();
    }

    getResponseNote() {
        return !this.response ? "" : this.response.note;
    }

    getResponseIDs() {
        return !this.response ? [] : this.response.id;
    }
}
