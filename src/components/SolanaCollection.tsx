import React, { useEffect, useReducer, useState } from 'react'
import { Collection } from '../models/collection.model'
import Avatar from '@mui/material/Avatar';
import { CollectionDetail } from '../models/collection-detail.model';
import Stack from '@mui/material/Stack';

import Loading from './Loading';
import SolanaDetailBox from './SolanaDetailBox';

function SolanaCollection(collection: Collection) {
    const [data, setData] = useState<CollectionDetail>({} as CollectionDetail);
    const [isLoading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        await fetch(
              'https://solana-sniper-api.vercel.app/collectionDetails?symbol=' + collection.symbol
        )
        .then(r => r.json())
        .then(r => {
            const todayTimestamp = Date.now(); 
            let monthsDifference = 0;
            if (r.data.mintDate) {
                const dateTimestamp = r.data.mintDate; 
                const timestampDifference = todayTimestamp - dateTimestamp; 
                monthsDifference = timestampDifference / (1000 * 60 * 60 * 24 * 30); 
            }

            setData({...r.data, mintDateDiffFromNow: Number(monthsDifference.toFixed(0)) });
            setLoading(false);
        });
    }
    useEffect(() => {
        if (collection.symbol) {
            fetchData();
        } else {
            setData({} as CollectionDetail);
            setLoading(false);
        }
    }, [collection]);


    if (isLoading) {
        return (<Loading></Loading>)
    }
    
  return (
            <>
                {
                    data.name && 
                    <Stack direction="row" spacing={9} sx={{margin: '20px 0 20px 20px'}}>
                        <Avatar alt="Collection" src={data.image} sx={{ width: 56, height: 56 }}/>
                        <SolanaDetailBox title={data.name} 
                                            symbolToLink={collection.symbol}
                                            subtitle={
                                                data.mintDateDiffFromNow < 1
                                                ? `less than one month`
                                                : `${data.mintDateDiffFromNow} months ago`
                                            } ></SolanaDetailBox>
                        {
                            data.oneDayVolume && 
                            <SolanaDetailBox title={`${data.oneDayVolume.toFixed(2)} SOL`} 
                                            subtitle={'1d volume'} ></SolanaDetailBox>
                        }

                        <SolanaDetailBox title={`${data.floorPrice.toFixed(2)} SOL`} 
                                            subtitle={'Floor'} ></SolanaDetailBox>
                        {
                            data.lastSold && 
                                <SolanaDetailBox title={`${data.lastSold.toFixed(2)} SOL`} 
                                            subtitle={'Last Sold'} ></SolanaDetailBox>
                        }
                         {
                            data.uniqueHolders &&
                                <SolanaDetailBox title={data.uniqueHolders} 
                                            subtitle={'Holders'} ></SolanaDetailBox>
                        }
                        {
                            data.listedCount &&
                                <SolanaDetailBox title=
                                            {`${data.listedCount}/${data.supply} (${(data.listedCount/data.supply * 100).toFixed(1)}%)`}
                                            subtitle={'Listed / Supply (%)'} ></SolanaDetailBox>

                        }
                    </Stack>
                }
            </>
        );
}
export default SolanaCollection