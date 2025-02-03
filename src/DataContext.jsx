// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/read-projects')
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
