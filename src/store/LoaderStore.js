import { makeAutoObservable } from "mobx";

export class LoaderStore {
  isLoading: boolean = false;
  dimsToLoad: string[] = []; // Dimensions
  loadingErrors: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  /* async */ setLoading() {
    this.isLoading = true;
  }

  notLoading() {
    this.isLoading = false;
  }

  addLoadingError(err: string) {
    this.loadingErrors.push(err);
  }

  hasDimsToLoad(): boolean {
    return this.dimsToLoad.length > 0;
  }

  addDimToLoad(dim: string) {
    this.dimsToLoad.push(dim);
  }

  getDimToLoad(): string {
    return this.dimsToLoad.pop();
  }
}
