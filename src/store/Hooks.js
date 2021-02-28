import React from "react";
import { storesContext } from "./Stores";

// export const useStores = () => React.useContext(storesContext);

export const useStore = (store) => React.useContext(storesContext)[store];
