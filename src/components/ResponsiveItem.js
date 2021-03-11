import React from "react";
import { Col, FlexboxGrid } from "rsuite";

const ResponsiveItem = ({ size, children }) => {
    let xs, sm, md, lg;

    switch (size) {
        case 2: {
            xs = 24;
            sm = 18;
            md = 12;
            lg = 8;
            break;
        }
        case 1:
        default: {
            xs = 24;
            sm = 24;
            md = 24;
            lg = 24;
        }
    }

    return (
        <FlexboxGrid.Item componentClass={Col} xs={xs} sm={sm} md={md} lg={lg}>
            {children}
        </FlexboxGrid.Item>
    );
};

export default ResponsiveItem;
