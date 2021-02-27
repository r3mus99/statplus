import { createContext } from 'react';
import { TableDataStore } from './TableDataStore';
import { LoadingStore } from './LoadingStore';

export const stores = Object.freeze({
    loadingStore: new LoadingStore(),
    tableDataStore: new TableDataStore(),
});

export const storesContext = createContext(stores);
export const StoresProvider = storesContext.Provider;
