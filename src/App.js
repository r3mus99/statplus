import React, { useEffect } from "react";
// store
import { useStore } from "./store/Hooks";
import { observer } from "mobx-react-lite";
import { TableDataStore } from "./store/TableDataStore";
import { LoadingStore } from "./store/LoadingStore";
// load
import { getCollection } from "./api/LoadApi";
import { toOptions, toItemMap } from "./api/Utils";
// components
import { Dropdown } from "semantic-ui-react";
import logo from "./logo.svg";
import "./App.css";
import Example from "./components/Example";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const App = observer(() => {
  const store: TableDataStore = useStore("tableDataStore");
  const loading: LoadingStore = useStore("loadingStore");
  useEffect(() => {
    loading.setLoading();

    getCollection(
      ({ link: { item } }) => {
        store.setTables(toItemMap(item));
      },
      () => loading.notLoading()
    );
  }, []);

  const options = store
    .getTables()
    .map(({ href, label }) => ({ key: href, value: href, text: label }));

  return (
    <div className="App">
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
});

export default App;
