import React from "react";
// store
import { useStore } from "./store/Hooks";
import { observer } from "mobx-react-lite";
import { TableDataStore } from "./store/TableDataStore";
import Loader from "./store/Loader";
import { TABLE_DATA } from "./store/Stores";
// components
// import "./App.css";
import Input from "./components/dataInput/Input";
import { Container, Content, FlexboxGrid, Header, Panel } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import FixedColumnTable from "./components/dataShow/FixedColumnTable";
import Result from "./components/dataShow/Result";
import ResponsiveItem from "./components/ResponsiveItem";

const App = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);

    return (
        <Loader>
            <Container>
                <FlexboxGrid justify="center">
                    <Header>
                        <h2>STAT+</h2>
                    </Header>
                </FlexboxGrid>
                <Content>
                    <FlexboxGrid justify="center">
                        <ResponsiveItem size={2}>
                            <Panel bordered>
                                <Input />
                            </Panel>
                        </ResponsiveItem>
                        <ResponsiveItem size={2}>
                            <Panel bordered>
                                {tableData.getResponseNote()}
                            </Panel>
                            <Panel bordered>
                                <Result />
                            </Panel>
                            <FixedColumnTable />
                        </ResponsiveItem>
                    </FlexboxGrid>
                </Content>
            </Container>
        </Loader>
    );
});

export default App;
