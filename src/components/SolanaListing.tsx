import React, { useEffect, useState } from 'react'
import { CollectionListingDetail } from '../models/collection-listing.model';
import { Collection } from '../models/collection.model'
import './SolanaListing.scss';
import Grid from '@mui/material/Grid';

import Loading from './Loading';
import SolanaCard from './SolanaCard';


const SolanaListing = (collection: Collection) => {
  const [data, setData] = useState<CollectionListingDetail[]>({} as CollectionListingDetail[]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await fetch(
          'https://solana-sniper-api.vercel.app/listing?symbol=' + collection.symbol
    )
    .then(r => r.json())
    .then(r => {
        if (r.data.length > 0) {
            const listElements = r.data
                                    .filter(e => e.type === 'POOL_BUY' || e.type === 'LISTED')
                                    .sort((a, b) => a.amount - b.amount)
                                    .slice(0, 100)
            setData([...listElements]);
        }
        setLoading(false);
    });
}
useEffect(() => {
    if (collection.symbol) {
        fetchData();
    } else {
        setData({} as CollectionListingDetail[]);
        setLoading(false);
    }
}, [collection]);




if (isLoading) {
    return (<Loading></Loading>)
}

  return (
    <>
        {
        data.length && 
            <div>
                <Grid container spacing={2} 
                 direction="row"
                 justifyContent="center"
                 alignItems="center">
                    {
                        data.map((item, i) =>
                            <SolanaCard key={i} item={item}   />
                        )
                    }
                </Grid>
            </div>
        }
    </>
  )
}

export default SolanaListing