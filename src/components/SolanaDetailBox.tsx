import React from 'react'
import './SolanaDetailBox.scss'
const SolanaDetailBox = ({title, subtitle}) => {
  return (
    <div className='collection-container'>
        <span className='collection-container__title'>{title}</span>
        <div className='collection-container__subtitle'>
            <span>{subtitle}</span>
        </div>
    </div>
  )
}

export default SolanaDetailBox