import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Header from './../Header/Header.jsx'
import Footer from './../Footer/Footer.jsx'
import ActivityFeed from './../ActivityFeed/ActivityFeed.jsx'
import Archive from './../Archive/Archive.jsx'
import Loader from './../Loader/Loader.jsx'
import { getCalls } from './../../store/AirCallSlice'
import './AppMain.scss'

const getFilteredCalls = (callLogs, filterFeed) => {
    const tempCalls = JSON.parse(JSON.stringify(callLogs))
    return tempCalls.filter((c) => {
        if (c.duration === 0) {
            return false
        }

        if (filterFeed === 'inbox' && c.is_archived) {
            return false
        }

        return true
    })
}

const AppMain = (props) => {
    const dispatch = useDispatch()
    const { callLogs, isLoading } = props
    const [menuItem, setMenuItem] = useState('inbox')
    const [calls, setCalls] = useState(getFilteredCalls(callLogs, menuItem))

    useEffect(() => {
        dispatch(getCalls())
    }, [])

    useEffect(() => {
        setCalls(getFilteredCalls(callLogs, menuItem))
    }, [callLogs])

    useEffect(() => {
        setCalls(getFilteredCalls(callLogs, menuItem))
    }, [menuItem])

    return (
        <div className="app-main">
            {isLoading && <Loader />}
            <Header menuItem={menuItem} setMenuItem={setMenuItem} />
            <div className="app-main__view">
                <Archive />
                <ActivityFeed calls={calls} />
            </div>
            <Footer callCount={calls.length} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        callLogs: state.airCall.callLogs,
        isLoading: state.airCall.isLoading,
    }
}

export default connect(mapStateToProps, null)(AppMain)
