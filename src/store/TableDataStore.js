// import { action, observable } from 'mobx';
import { makeAutoObservable } from "mobx";
import { Table, Options } from "../Types";
import { getTableId } from "./StoreUtils";

// TODO loader store, isLoading, loading queue
export class TableDataStore {
    tables: Map<string, Table> = new Map(); // table data indexed by href (unique)
    options: Map<string, Options> = new Map();

    selectedTable: string = ""; // todo zmenit z href na tableid
    selectedOptions: Map<string, string[]> = new Map();

    response: string = "..."; // todo TEMP

    constructor() {
        makeAutoObservable(this);
    }

    setTables(map: Map<string, Table>) {
        this.tables = map;
    }

    getTables(): Table[] {
        return Array.from(this.tables.values()); // not optimal, creates copy
    }

    addOptions(o: Options) {
        this.options.set(o.label, o);
    }

    selectTable(table: string) {
        this.selectedTable = table;
    }

    getSelectedTableData(): Table | undefined {
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
