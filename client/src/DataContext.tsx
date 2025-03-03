// DataContext.js
import React, {createContext, useState, useEffect, Context} from 'react';
import {ProjectInterface} from "./Types/types";

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

export const DataContext = createContext([]);

// @ts-ignore
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(
      []
  );

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/read-projects`)
        .then(response => response.json())
        .then(fetchedData => setData(fetchedData))
        .catch(error => console.error('Error fetching data:', error));


  }, []);

  return (
      <DataContext.Provider value={data}>
        {children}
      </DataContext.Provider>
  );
};
