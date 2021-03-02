import React, { useEffect } from "react";
// store
import { useStore } from "./store/Hooks";
import { observer } from "mobx-react-lite";
import { TableDataStore } from "./store/TableDataStore";
import { LoaderStore } from "./store/LoaderStore";
import Loader from "./store/Loader";
import { LOADER, TABLE_DATA } from "./store/Stores";
// load
import { getCollection } from "./api/LoadApi";
import { toItemMap } from "./api/Utils";
// components
// import "./App.css";
import Input from "./components/Input";
import { Col, Container, Content, FlexboxGrid, Header, Panel } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import FixedColumnTable from "./components/FixedColumnTable";

const App = observer(() => {
    const tableData: TableDataStore = useStore(TABLE_DATA);
    const loader: LoaderStore = useStore(LOADER);

    useEffect(() => {
        loader.setLoading();

        getCollection(
            ({ link: { item } }) => {
                tableData.setTables(toItemMap(item));
            },
            () => loader.notLoading()
        );
    }, [tableData, loader]);

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
                        <FlexboxGrid.Item
                            componentClass={Col}
                            colspan={24}
                            md={16}
                            lg={12}
                        >
                            <Panel bordered>
                                <Input />
                            </Panel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item
                            componentClass={Col}
                            colspan={24}
                            md={16}
                            lg={12}
                        >
                            <Panel bordered>{tableData.response}</Panel>
                            <FixedColumnTable />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
        </Loader>
    );
});

export default App;
