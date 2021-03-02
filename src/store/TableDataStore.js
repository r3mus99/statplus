// import { action, observable } from 'mobx';
import { makeAutoObservable } from "mobx";
import { Dataset, Options } from "../Types";
import { getTableId } from "./StoreUtils";

// TODO loader store, isLoading, loading queue
export class TableDataStore {
    tables: Map<string, Dataset> = new Map(); // table data indexed by href (unique) todo rename DATASET
    options: Map<string, Options> = new Map(); // todo rename DIMENSIONS

    selectedTable: string = ""; // todo zmenit z href na tableid
    selectedOptions: Map<string, string[]> = new Map();

    response: any = []; // todo TEMP

    constructor() {
        makeAutoObservable(this);
    }

    setTables(map: Map<string, Dataset>) {
        this.tables = map;
    }

    getTables(): Dataset[] {
        return Array.from(this.tables.values()); // not optimal, creates copy
    }

    addOptions(o: Options) {
        this.options.set(o.label, o);
    }

    selectTable(table: string) {
        this.selectedTable = table;
    }

    getSelectedTableData(): Dataset | undefined {
        return this.tables.get(this.selectedTable);
    }

    getSelectedTableId(): string | undefined {
        return this.selectedTable
            ? getTableId(this.selectedTable) // todo better solution?
            : undefined;
    }

    selectOptions(dim: string, options: string[]) {
        this.selectedOptions.set(dim, options);
    }

    clearSelectedOptions() {
        this.selectedOptions.clear();
    }

    getSelectedOptions(): string[] {
        return Array.from(this.selectedOptions.values());
    }

    setResponse(res: string) {
        this.response = res;
    }
}
