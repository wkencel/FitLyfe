/**
 * @name globalContext
 * @desc Context container that, when updated with
 * the right credentials, changes the global state
 */

import React, { useState, createContext } from 'react';

// declare the object that will contain the global state
// needs both array and way to set state
const globalState = {
  clients: [],
  setClients: () => {},
  clientData: [],
  setClientData: () => {}
};

// create a global context with that global state
export const globalContext = createContext(globalState);

export const GlobalProvider = (props) => {
  const [clients,  setClients] = useState([]);
  const [clientData, setClientData] = useState([])
  return (
    <globalContext.Provider value={{ clients, clientData, setClients, setClientData}}>
      {props.children}
    </globalContext.Provider>
  );
};
