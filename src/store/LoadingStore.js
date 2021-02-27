import { makeAutoObservable } from "mobx";

export class LoadingStore {
  isLoading: boolean = false;
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
}
