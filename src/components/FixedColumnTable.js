import React from "react";
// store
import { observer } from "mobx-react-lite";
import { TABLE_DATA } from "../store/Stores";
import { useStore } from "../store/Hooks";
import { TableDataStore } from "../store/TableDataStore";
// components
import { Table } from "rsuite";

const FixedColumnTable = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    const { Column, HeaderCell, Cell } = Table;

    let cols: string[] = [];
    if (tableData.response && tableData.response[0]) {
        cols = tableData.response[0];
    }

    const rows = [];
    if (!!cols) {
        for (let i = 1; i < tableData.response.length; i++) {
            const rowData: string[] = tableData.response[i];

            let row = {};
            rows.push(row);
            cols.forEach((col, i) => (row[col] = rowData[i]));
        }
    }

    return (
        <div>
            <Table
                height={400}
                data={rows}
                onRowClick={(data) => {
                    console.log(data);
                }}
            >
                {cols.map((id) => (
                    <Column key={id}>
                        <HeaderCell>{id}</HeaderCell>
                        <Cell dataKey={id} />
                    </Column>
                ))}
            </Table>
        </div>
    );
});

export default FixedColumnTable;
