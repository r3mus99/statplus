import React from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../store/TableDataStore";
import { useStore } from "../store/Hooks";
import { TABLE_DATA } from "../store/Stores";
// load
import { getData } from "../api/LoadApi";
import JSONStat from "jsonstat-toolkit";
// components
import { Button, ControlLabel, Form, FormGroup } from "rsuite";
import DimensionPicker from "./DimensionPicker";
import DatasetPicker from "./DatasetPicker";
// types
import type { Dimension } from "../Types";

const Input = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    // const loader: LoaderStore = useStore(LOADER);

    let dimensions = [];
    const selectedTable = tableData.getSelectedTableData();
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
                        tableData.getSelectedTableId(),
                        tableData.getSelectedOptions(),
                        (res) => {
                            tableData.setResponse(
                                JSONStat(res).Dataset(0).toTable()
                            );
                            console.log(JSONStat(res).Dataset(0).toTable());
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
