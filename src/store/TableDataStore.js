// import { action, observable } from 'mobx';
import { makeAutoObservable } from "mobx";
import { Table, Options } from "../Types";

// TODO loader store, isLoading, loading queue
export class TableDataStore {
  selectedTable: string = ""; // todo zmenit z href na tableid

  tables: Map<string, Table> = new Map(); // table data indexed by href (unique)
  options: Map<string, Options> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  selectTable(table: string) {
    this.selectedTable = table;
  }

  setTables(map: Map<string, Table>) {
    this.tables = map;
  }

  getTables(): Table[] {
    return Array.from(this.tables.values()); // not optimal, creates copy
  }

  getSelectedTableData(): Table | undefined {
    return this.tables.get(this.selectedTable);
  }

  addOptions(o: Options) {
    this.options.set(o.label, o);
  }
}
