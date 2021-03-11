import React, { useState } from "react";
// load
import { getData } from "../../api/LoadApi";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../../store/TableDataStore";
import { useStore } from "../../store/Hooks";
import { TABLE_DATA } from "../../store/Stores";
// components
import { Button } from "rsuite";
// utils
import JSONStat from "jsonstat-toolkit";
import * as JSONstatUtils from "jsonstat-suite";

const LoadButton = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);

    const [isLoading, setLoading] = useState(false);

    return (
        <Button
            type="submit"
            appearance="primary"
            block
            loading={isLoading}
            onClick={() => {
                setLoading(true);
                getData(
                    tableData.getSelectedDatasetId(),
                    tableData.getSelectedDimensions(),
                    (res) => {
                        setLoading(false);
                        const dataset = JSONStat(res).Dataset(0);
                        tableData.setResponse(dataset);
                        // console.log(dataset);
                        // console.log(dataset.toTable());
                        // TODO USING REF!!
                        JSONstatUtils.tbrowser(
                            JSONStat(res),
                            document.getElementById("tbrowser"),
                            {
                                preset: "smaller",
                            }
                        );
                    }
                );
            }}
        >
            Načítaj
        </Button>
    );
});

export default LoadButton;
