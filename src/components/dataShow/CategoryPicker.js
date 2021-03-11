import React, { useState } from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../../store/TableDataStore";
// components
import { Divider, FlexboxGrid, SelectPicker } from "rsuite";
import { useStore } from "../../store/Hooks";
import { TABLE_DATA } from "../../store/Stores";
import ResponsiveItem from "../ResponsiveItem";

const CategoryPicker = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);

    const [row, setRow] = useState();
    const [col, setCol] = useState();

    const div1 = <Divider>Riadky a stĺpce</Divider>;
    const div2 = <Divider>Filtre</Divider>;
    const div3 = <Divider>Konštanty</Divider>;

    let rowPicker, colPicker;

    const options = tableData.getResponseIDs().map((id) => ({
        value: id,
        label: `[${id}] ${tableData.getDimensionLabel(id)}`,
    }));

    if (options.length > 2) {
        const defaultRow = options[0] ? options[0].value : undefined;
        const defaultCol = options[1] ? options[1].value : undefined;

        rowPicker = (
            <SelectPicker
                defaultValue={defaultRow}
                value={row}
                onSelect={setRow}
                data={options}
                block
                searchable={false}
            />
        );

        colPicker = (
            <SelectPicker
                defaultValue={defaultCol}
                value={col}
                onSelect={setCol}
                data={options}
                block
                searchable={false}
            />
        );
    }

    return (
        options.length > 0 && (
            <FlexboxGrid justify="center">
                <ResponsiveItem>{div1}</ResponsiveItem>
                <ResponsiveItem>
                    {row} {col}
                </ResponsiveItem>
                <ResponsiveItem size={2}>{rowPicker}</ResponsiveItem>
                <ResponsiveItem size={2}>{colPicker}</ResponsiveItem>
                <ResponsiveItem>{div2}</ResponsiveItem>
                <ResponsiveItem>{div3}</ResponsiveItem>
            </FlexboxGrid>
        )
    );
});

export default CategoryPicker;
