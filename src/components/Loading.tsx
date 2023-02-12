import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import './Loading.scss';

const Loading = () => {
  return (
    <div className='loading-container'>
        <CircularProgress />
    </div>
  )
}

export default Loading;