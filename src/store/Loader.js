// store
import { observer } from "mobx-react-lite";
// import { LoaderStore } from "./LoaderStore";
// import { TableDataStore } from "./TableDataStore";
// import { useStore } from "./Hooks";
// import { LOADER, TABLE_DATA } from "./Stores";
// load
// import { getUrl } from "../api/LoadApi";
// import { toOptions } from "../api/Utils";
// types
// import type { OptionsResponse } from "../Types";

const Loader = observer((props) => {
  // const tableData: TableDataStore = useStore(TABLE_DATA);
  // const loader: LoaderStore = useStore(LOADER);

  // const selectedTable = tableData.getSelectedTableData();

  // todo
  // if (!!selectedTable) {
  //   selectedTable.dimension.forEach((d) => loader.addDimToLoad(d));
  // }

  // if (loader.hasDimsToLoad() && !loader.isLoading) {
  //   loader.setLoading();
  //   getUrl(loader.getDimToLoad(), (res: OptionsResponse) => {
  //     loader.notLoading();
  //     tableData.addOptions(toOptions(res));
  //   });
  // }

  return (
    <div>
      {props.children}
      {/*{loader.isLoading}*/}
      {/*{loader.dimsToLoad}*/}
    </div>
  );
});

export default Loader;
