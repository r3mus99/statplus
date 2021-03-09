import React from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../store/TableDataStore";
import { useStore } from "../store/Hooks";
import { TABLE_DATA } from "../store/Stores";
// load
import { getData } from "../api/LoadApi";
// components
import { Button, ControlLabel, Form, FormGroup } from "rsuite";
import DimensionPicker from "./DimensionPicker";
import DatasetPicker from "./DatasetPicker";
// types
import type { Dimension } from "../Types";
// utils
import JSONStat from "jsonstat-toolkit";
import * as JSONstatUtils from "jsonstat-suite";

const Input = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    // const loader: LoaderStore = useStore(LOADER);

    let dimensions = [];
    const selectedTable = tableData.getSelectedDataset();
    if (!!selectedTable) {
        dimensions = selectedTable.dimension.map((d: Dimension) => (
            <FormGroup key={d.label}>
                <ControlLabel>{d.note}</ControlLabel>
                <DimensionPicker dimension={d.label} />
            </FormGroup>
        ));
    }

    return (
        <Form>
            <FormGroup>
                <DatasetPicker />
            </FormGroup>
            {dimensions}
            <Button
                type="submit"
                appearance="primary"
                block
                onClick={() => {
                    getData(
                        tableData.getSelectedDatasetId(),
                        tableData.getSelectedCategories(),
                        (res) => {
                            const dataset = JSONStat(res).Dataset(0);
                            tableData.setResponse(dataset.toTable());
                            tableData.datasetNote = dataset.note;
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
        </Form>
    );
});

export default Input;
