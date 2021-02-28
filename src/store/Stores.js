import { createContext } from "react";
import { TableDataStore } from "./TableDataStore";
import { LoaderStore } from "./LoaderStore";

export const TABLE_DATA = "tableDataStore";
export const LOADER = "loaderStore";

export const stores = Object.freeze({
  loaderStore: new LoaderStore(),
  tableDataStore: new TableDataStore(),
});

export const storesContext = createContext(stores);
export const StoresProvider = storesContext.Provider;
