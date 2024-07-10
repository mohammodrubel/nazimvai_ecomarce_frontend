// ReduxProvider.js
"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { HashLoader } from "react-spinners";

const persistor = persistStore(store);

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div style={{width:'100%',height:"80vh",display:'flex',alignItems:'center'}}>
        <HashLoader style={{color:'#663130'}} />
    </div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
