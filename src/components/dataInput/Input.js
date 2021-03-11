import React from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../../store/TableDataStore";
import { useStore } from "../../store/Hooks";
import { TABLE_DATA } from "../../store/Stores";
// components
import { ControlLabel, Form, FormGroup } from "rsuite";
import DimensionPicker from "./DimensionPicker";
import DatasetPicker from "./DatasetPicker";
import LoadButton from "./LoadButton";
// types
import type { Dimension } from "../../Types";

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
            <LoadButton />
        </Form>
    );
});

export default Input;
