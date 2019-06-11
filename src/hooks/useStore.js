
import React, { useState, useContext, useMemo } from 'react';

function createStore() {
  const context = React.createContext();

  const Provider = ({ initialState = {}, children }) => {
    const [ state, setState ] = useState(initialState);

    const contextValue = useMemo(() => [ state, setState ], [ state ]);

    return <context.Provider value={ contextValue }>{ children }</context.Provider>
  }

  const useStore = () => useContext(context);

  return { Provider, useStore };
}

const [ ContextStore, useStore ] = createStore();

export default {
  ContextStore,
  useStore
}