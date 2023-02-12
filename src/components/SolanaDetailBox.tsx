import Link from '@mui/material/Link'
import React from 'react'
import './SolanaDetailBox.scss';


const SolanaDetailBox = ({title, subtitle, symbolToLink=''}) => {
  return (
    <div className='collection-container'>
        <span className='collection-container__title'>{
          symbolToLink 
          ? <Link href={`https://magiceden.io/marketplace/${symbolToLink}`} 
              underline="hover"
              sx={{color: '#000'}} 
              target={'_blank'}>{title}</Link>
          : title
        }</span>
        <div className='collection-container__subtitle'>
            <span>{subtitle}</span>
        </div>
    </div>
  )
}

export default SolanaDetailBox