import React, { useState } from "react";
import { Checkbox, CheckPicker } from "rsuite";
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../../store/TableDataStore";
import { useStore } from "../../store/Hooks";
import { TABLE_DATA } from "../../store/Stores";

const DimensionPicker = observer(({ dimension }) => {
    const tableData: TableDataStore = useStore(TABLE_DATA);

    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [value, setValue] = useState(false);

    const options = tableData.categories.get(dimension);
    const optionItems = [];
    if (!!options) {
        options.category.forEach((v, k) =>
            optionItems.push({
                value: k,
                label: v,
            })
        );
    }

    const values = optionItems.map((item) => item.value);

    const handleChange = (value) => {
        // update store
        tableData.selectOptions(dimension, value);
        // update state
        setValue(value);
        setIndeterminate(value.length > 0 && value.length < values.length);
        setCheckAll(value.length === values.length);
    };

    const handleCheckAll = (value, checked) => {
        // update store
        tableData.selectOptions(dimension, checked ? values : []);
        // update state
        setValue(checked ? values : []);
        setIndeterminate(false);
        setCheckAll(checked);
    };

    const footer = () => (
        <div style={{ borderTop: "1px solid #e5e5e5" }}>
            <Checkbox
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={handleCheckAll}
            >
                Vybrať všetko
            </Checkbox>
        </div>
    );
    return (
        <CheckPicker
            data={optionItems}
            placeholder="Vyber možnosti"
            value={value}
            block
            onChange={handleChange}
            searchable={false}
            renderExtraFooter={footer}
        />
    );
});

export default DimensionPicker;
