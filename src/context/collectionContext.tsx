import React, { useEffect, useState, useContext } from 'react';
import { Collection, Collections } from '../models/collection.model';

const CollectionContext = React.createContext({} as Collections);

export function CollectionProvider(props) {

    const [data, setData] = useState<Collections>({} as Collections);

    const fetchData = async () => {
      await fetch(
            'https://solana-sniper-api.vercel.app/collections'
      )
      .then(r => r.json())
      .then(r => {
          const newRows = r.data.collections.map((p: any, index: number) => {
          return {
              id: index,
              symbol: p.symbol,
              label: p.name,
              image: p.image
          } as Collection
          });
          setData({
            list: newRows
          });
      });
  }
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <CollectionContext.Provider value={data}>
        {props.children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
    return useContext(CollectionContext);
}