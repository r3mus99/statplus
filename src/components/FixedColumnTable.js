import React from "react";
// store
import { observer } from "mobx-react-lite";
// components
import { Table } from "rsuite";
import { TableDataStore } from "../store/TableDataStore";
import { useStore } from "../store/Hooks";
import { TABLE_DATA } from "../store/Stores";

const FixedColumnTable = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    const { Column, HeaderCell, Cell } = Table;

    const cols =
        tableData.response &&
        tableData.response[0] &&
        tableData.response[0].map((colId) => {
            return (
                <Column width={200}>
                    <HeaderCell>{colId}</HeaderCell>
                    <Cell dataKey={colId} />
                </Column>
            );
        });

    const rows = [];
    for (let i = 1; i < tableData.response.length; i++) {
        // todo
        // let row = [];
        // tableData.response[0].forEach();
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
                {cols}
            </Table>
        </div>
    );
});

export default FixedColumnTable;
