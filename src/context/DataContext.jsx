import React, { createContext, useEffect, useState } from "react";

import api from "../pages/api/items";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [resdata, setResdata] = useState([]);
  const [data, Setdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get("/products");
        const Data = res.data;
        Setdata(Data);
        setResdata(
          [...Data].filter((val) =>
            val.title.toLowerCase().includes(search.toLowerCase())
          )
        );
        // console.log(resdata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        data,
        resdata,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
