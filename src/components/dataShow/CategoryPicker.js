import React, { useState } from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../../store/TableDataStore";
// components
import { Divider, SelectPicker } from "rsuite";
import { useStore } from "../../store/Hooks";
import { TABLE_DATA } from "../../store/Stores";

const CategoryPicker = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);

    // todo readable label
    const options = tableData
        .getResponseIDs()
        .map((id) => ({ value: id, label: id }));

    const [row, setRow] = useState(options[0] && options[0].value);
    const [col, setCol] = useState(options[1] && options[1].value);

    return (
        <div>
            <Divider>Riadky a stĺpce</Divider>
            <SelectPicker value={row} data={options} block searchable={false} />
            <SelectPicker value={col} data={options} block searchable={false} />
            <Divider>Filtre</Divider>
            {/*<SelectPicker data={options} block searchable={false} />*/}
            {/*<SelectPicker data={options} block searchable={false} />*/}
            <Divider>Konštanty</Divider>
            {/*<SelectPicker data={options} block searchable={false} />*/}
            {/*<SelectPicker data={options} block searchable={false} />*/}
        </div>
    );
});

export default CategoryPicker;
