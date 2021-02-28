import React, { useEffect } from "react";
// store
import { useStore } from "./store/Hooks";
import { observer } from "mobx-react-lite";
import { TableDataStore } from "./store/TableDataStore";
import { LoaderStore } from "./store/LoaderStore";
// load
import { getCollection } from "./api/LoadApi";
import { toItemMap } from "./api/Utils";
// components
import { Dropdown, Header } from "semantic-ui-react";
import "./App.css";
import Loader from "./store/Loader";
import { LOADER, TABLE_DATA } from "./store/Stores";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const App = observer(() => {
  const store: TableDataStore = useStore(TABLE_DATA);
  const loading: LoaderStore = useStore(LOADER);

  useEffect(() => {
    loading.setLoading();

    getCollection(
      ({ link: { item } }) => {
        store.setTables(toItemMap(item));
      },
      () => loading.notLoading()
    );
  }, [store, loading]);

  const options = store
    .getTables()
    .map(({ href, label }) => ({ key: href, value: href, text: label }));

  return (
    <Loader>
      <div className="App">
        <Header as="h1">STAT+</Header>
        <Dropdown
          placeholder="Vyber tému"
          fluid
          search
          selection
          // disabled={loading.isLoading}
          loading={loading.isLoading}
          options={options}
          onChange={(e, { value }) => store.selectTable(value)}
        />
        {loading.isLoading}
        {store.selectedTable}
      </div>
    </Loader>
  );
});

export default App;
