import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Api from "../Api";

type DataContextType = {
  produtores: any[];
  catalogo: any[];
  loading: boolean;
};

const DataContext = createContext<DataContextType>({
  produtores: [],
  catalogo: [],
  loading: true,
});

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [produtores, setProdutores] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const produtoresData = await Api.get("/produtores");
      const catalogoData = await Api.get("/catalogo");
      setProdutores(produtoresData.data);
      setCatalogo(catalogoData.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ produtores, catalogo, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);