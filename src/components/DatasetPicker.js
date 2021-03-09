import React from "react";
// store
import { observer } from "mobx-react-lite";
import { TableDataStore } from "../store/TableDataStore";
import { useStore } from "../store/Hooks";
import { TABLE_DATA } from "../store/Stores";
import { getTableGroup } from "../store/StoreUtils";
// load
import { getCollection, getUrl } from "../api/LoadApi";
import { toItemMap, toOptions } from "../api/Utils";
// components
import { Icon, SelectPicker } from "rsuite";

import type { CategoryResponse } from "../Types";

const Spinner = ({ text }) => {
    return (
        <p
            style={{
                padding: 5,
                color: "#999",
                textAlign: "center",
            }}
        >
            <Icon icon="spinner" spin />
            {text}
        </p>
    );
};

const DatasetPicker = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);

    const options = tableData.getDataset().map(({ href, label }) => ({
        value: href,
        label: label,
        role: getTableGroup(href),
    }));

    //region handlers
    const handleOpen = () => {
        if (options.length === 0) {
            getCollection(({ link: { item } }) =>
                tableData.setDataset(toItemMap(item))
            );
        }
    };

    const handleSelect = (value: string) => {
        tableData.selectDataset(value);
        tableData.clearSelectedOptions();
        tableData.getSelectedDataset().dimension.forEach((d) => {
            getUrl(d.href, (res: CategoryResponse) => {
                tableData.addCategories(toOptions(res));
            });
        });
    };

    const handleClean = (_) => {
        tableData.selectDataset(null);
        tableData.clearSelectedOptions();
    };
    //endregion handlers

    //region components
    const menu = (menu) => {
        if (options.length === 0) {
            return <Spinner />;
        }
        return menu;
    };

    const menuItem = (label, item) => {
        return (
            <div>
                <i className="rs-icon rs-icon-user" /> {label}
            </div>
        );
    };

    const menuGroup = (label, item) => {
        return (
            <div>
                <i className="rs-icon rs-icon-group" /> {label} (
                {item.children.length})
            </div>
        );
    };

    const value = (value, item) => {
        return (
            <div>
                <span style={{ color: "#575757" }}>
                    <i className="rs-icon rs-icon-user" />
                </span>{" "}
                {item.label}
            </div>
        );
    };
    //endregion components

    return (
        <SelectPicker
            data={options}
            placeholder="Vyber tému"
            block
            onOpen={handleOpen}
            onSelect={handleSelect}
            onClean={handleClean}
            groupBy="role"
            renderMenu={menu}
            renderMenuItem={menuItem}
            renderMenuGroup={menuGroup}
            renderValue={value}
        />
    );
});

export default DatasetPicker;
