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
import {
    Button,
    CheckPicker,
    ControlLabel,
    Form,
    FormGroup,
    SelectPicker,
} from "rsuite";
import DimensionPicker from "./DimensionPicker";
import DatasetPicker from "./DatasetPicker";
// types
import type { Dimension } from "../Types";

const Input = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    // const loader: LoaderStore = useStore(LOADER);

    let elements = []; // todo rename dims
    const selectedTable = tableData.getSelectedTableData();
    if (!!selectedTable) {
        elements = selectedTable.dimension.map(
            (d: Dimension, index: number) => {
                // const labelId = `${d.label}${index}`;

                return (
                    <FormGroup>
                        <ControlLabel>{d.note}</ControlLabel>
                        <DimensionPicker dimension={d.label} />
                    </FormGroup>
                );
            }
        );
    }

    return (
        <Form>
            <FormGroup>
                <DatasetPicker />
            </FormGroup>
            {elements}
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
