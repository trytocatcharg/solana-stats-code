import React, { useState } from 'react'
import meMarketPlace from  '../assets/magiceden-icon.png';
import hadesMarketPlace from '../assets/hadeswap-icon.png';
import tensorMarketPlace from '../assets/tensor-icon.png';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CollectionListingDetail } from '../models/collection-listing.model';
import './SolanaCard.scss';

function getMarketPlace (m: string) {
    switch (m) {
        case 'Hadeswap':
            return hadesMarketPlace
        case 'Tensorswap':
            return tensorMarketPlace
        default:
            return meMarketPlace
    }
}

interface SolanaCardProps {
    item: CollectionListingDetail
}

const SolanaCard = (props: SolanaCardProps) => {
    const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Card sx={{ maxWidth: 250, margin: '10px' }}>
        <div className='item-media-container'>
                <div className='item-media-container__marketplace'>
                    {
                        imgLoaded && 
                            <img src={getMarketPlace(props.item.marketplace)} />
                    }
                </div>
            
            <CardMedia
                    component="img"
                    sx={{ objectFit: 'contain' }}
                    image={props.item.image}
                    onLoad={() => setImgLoaded(true)}
            />
            
        </div>
        <CardContent  sx={{ paddingBottom: '15px !important'  }}>
            {
                imgLoaded &&
                        <>
                            <Typography variant="body2" color="black">
                                {props.item.name}
                            </Typography>
                            <Typography variant="body2" color="black" fontWeight='bold'>
                                {props.item.amount.toFixed(2)} SOL
                            </Typography>
                        </>
                
            }
        </CardContent>
        
</Card>
  )
}

export default SolanaCard