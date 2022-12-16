import React from 'react'
import './Loader.scss'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = (props) => {
    return (
        <div className="loader">
            {' '}
            <CircularProgress />
        </div>
    )
}

export default Loader
