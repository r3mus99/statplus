import React from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../store/TableDataStore";
import { useStore } from "../store/Hooks";
import { TABLE_DATA } from "../store/Stores";
import { getTableGroup } from "../store/StoreUtils";
// load
import { getData, getUrl } from "../api/LoadApi";
import { toOptions } from "../api/Utils";
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
// types
import type { Dimension, OptionsResponse } from "../Types";
import DimensionPicker from "./DimensionPicker";

const Input = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    // const loader: LoaderStore = useStore(LOADER);

    const options = tableData.getTables().map(({ href, label }) => ({
        value: href,
        label: label,
        role: getTableGroup(href),
    }));

    let elements = []; // todo rename dims
    const selectedTable = tableData.getSelectedTableData();
    if (!!selectedTable) {
        elements = selectedTable.dimension.map(
            (d: Dimension, index: number) => {
                // const labelId = `${d.label}${index}`;
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
                            value: k,
                            label: v,
                        })
                    );
                }

                return (
                    <FormGroup>
                        <ControlLabel>{d.note}</ControlLabel>
                        <CheckPicker
                            placeholder="Vyber možnosti"
                            data={optionItems}
                            block
                            searchable={false}
                            onSelect={(value: string) => {
                                tableData.selectOptions(d.label, value);
                            }}
                        />
                        <DimensionPicker dimension={d.label} />
                    </FormGroup>
                );
            }
        );
    }

    return (
        <Form>
            <FormGroup>
                <SelectPicker
                    placeholder="Vyber tému"
                    data={options}
                    block
                    onSelect={(value: string) => {
                        tableData.selectTable(value);
                        tableData.clearSelectedOptions();
                        tableData
                            .getSelectedTableData()
                            .dimension.forEach((d) => {
                                getUrl(d.href, (res: OptionsResponse) => {
                                    tableData.addOptions(toOptions(res));
                                });
                            });
                    }}
                    onClean={(_) => {
                        tableData.selectTable(null);
                        tableData.clearSelectedOptions();
                    }}
                    groupBy="role"
                    renderMenuItem={(label, item) => {
                        return (
                            <div>
                                <i className="rs-icon rs-icon-user" /> {label}
                            </div>
                        );
                    }}
                    renderMenuGroup={(label, item) => {
                        return (
                            <div>
                                <i className="rs-icon rs-icon-group" /> {label}{" "}
                                ({item.children.length})
                            </div>
                        );
                    }}
                    renderValue={(value, item) => {
                        return (
                            <div>
                                <span style={{ color: "#575757" }}>
                                    <i className="rs-icon rs-icon-user" />
                                </span>{" "}
                                {item.label}
                            </div>
                        );
                    }}
                />
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
