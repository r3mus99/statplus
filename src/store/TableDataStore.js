// import { action, observable } from 'mobx';
import { makeAutoObservable } from "mobx";
import { Table, Options } from "../Types";

// TODO loader store, isLoading, loading queue
export class TableDataStore {
    tables: Map<string, Table> = new Map(); // table data indexed by href (unique)
    options: Map<string, Options> = new Map();

    selectedTable: string = ""; // todo zmenit z href na tableid
    selectedOptions: Map<string, string[]> = new Map();

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

    selectOptions(dim: string, options: string[]) {
        this.selectedOptions.set(dim, options);
    }
}
