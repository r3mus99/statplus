import React, { useEffect } from "react";
// store
import { useStore } from "./store/Hooks";
import { observer } from "mobx-react-lite";
import { TableDataStore } from "./store/TableDataStore";
import { LoaderStore } from "./store/LoaderStore";
// load
import { getCollection, getUrl } from "./api/LoadApi";
import { toItemMap, toOptions } from "./api/Utils";
// components
import { Dropdown, Header } from "semantic-ui-react";
import "./App.css";
import Loader from "./store/Loader";
import { LOADER, TABLE_DATA } from "./store/Stores";
// types
import type { OptionsResponse } from "./Types";

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const App = observer(() => {
  const tableData: TableDataStore = useStore(TABLE_DATA);
  const loader: LoaderStore = useStore(LOADER);

  useEffect(() => {
    loader.setLoading();

    getCollection(
      ({ link: { item } }) => {
        tableData.setTables(toItemMap(item));
      },
      () => loader.notLoading()
    );
  }, [tableData, loader]);

  const options = tableData
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
          // disabled={loader.isLoading}
          loading={loader.isLoading}
          options={options}
          onChange={(e, { value }) => {
            tableData.selectTable(value);
            tableData.getSelectedTableData().dimension.forEach((d) => {
              getUrl(d.href, (res: OptionsResponse) => {
                tableData.addOptions(toOptions(res));
              });
            });
          }}
        />
        {loader.isLoading}
        {tableData.selectedTable}
      </div>
    </Loader>
  );
});

export default App;
