import React, { useState } from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../store/TableDataStore";
import { useStore } from "../store/Hooks";
import { LOADER, TABLE_DATA } from "../store/Stores";
import { LoaderStore } from "../store/LoaderStore";
// load
import { getUrl } from "../api/LoadApi";
import { toOptions } from "../api/Utils";
// components
import { Dropdown, Form, FormField, Label } from "semantic-ui-react";
// types
import type { Dimension, OptionsResponse } from "../Types";

const Input = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    const loader: LoaderStore = useStore(LOADER);

    const options = tableData
        .getTables()
        .map(({ href, label }) => ({ key: href, value: href, text: label }));

    let elements = []; // todo rename dims
    const selectedTable = tableData.getSelectedTableData();
    if (!!selectedTable) {
        elements = selectedTable.dimension.map(
            (d: Dimension, index: number) => {
                const labelId = `${d.label}${index}`;
                const options = tableData.options.get(d.label);
                const optionItems = [];
                if (!!options) {
                    // todo
                    // optionItems.push({
                    //     key: "all",
                    //     value: "all",
                    //     text: "všetky možnosti",
                    // });
                    options.category.forEach((v, k) =>
                        optionItems.push({
                            key: k,
                            value: k,
                            text: v,
                        })
                    );
                }

                return (
                    <Form.Dropdown
                        label={d.note}
                        placeholder="Vyber možnosti"
                        fluid
                        search
                        multiple
                        selection
                        options={optionItems}
                        onChange={(e, { value }) => {
                            tableData.selectOptions(d.label, value);
                        }}
                    />
                );
            }
        );
    }

    return (
        <Form>
            <Form.Dropdown
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
            {elements}
        </Form>
    );
});

// todo, maybe later
// function useDropdown(
//   labelId: string,
//   label: string,
//   id: string,
//   onChange: (value: string) => void,
//   options: any
// ) {
//   const [value, setValue] = useState("");
//   return (
//     <Dropdown
//       placeholder="Vyber tému"
//       fluid
//       search
//       selection
//       // disabled={loader.isLoading}
//       loading={loader.isLoading}
//       options={options}
//       onChange={(e, { value }) => {
//         tableData.selectTable(value);
//         tableData.getSelectedTableData().dimension.forEach((d) => {
//           getUrl(d.href, (res: OptionsResponse) => {
//             tableData.addOptions(toOptions(res));
//           });
//         });
//       }}
//     />
//   );
// }

export default Input;
