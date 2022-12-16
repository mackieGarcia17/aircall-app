import React from 'react'
import './Archive.scss'
import InventoryIcon from '@mui/icons-material/Inventory'
import { connect, useDispatch } from 'react-redux'
import { archievedCalls } from './../../store/AirCallSlice'

const Archive = (props) => {
    const dispatch = useDispatch()
    const { callLogs } = props

    const archiveAllCalls = () => {
        const callIds = callLogs.filter((c) => !c.is_archived && c.id && c.duration > 0).map((c) => c.id)
        dispatch(archievedCalls([...callIds]))
    }

    return (
        <div className="archive">
            <div className="archive__content" onClick={archiveAllCalls}>
                <InventoryIcon />
                <p>Archive all calls</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        callLogs: state.airCall.callLogs,
    }
}

export default connect(mapStateToProps, null)(Archive)
