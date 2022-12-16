import React from 'react'
import './ActivityDetail.scss'
import { connect, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import CallIcon from '@mui/icons-material/Call'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import { unArchievedCall } from './../../store/AirCallSlice'

import moment from 'moment'

const ActivityDetail = (props) => {
    const dispatch = useDispatch()
    const { call, directory } = props
    const createdDate = moment.utc(call.created_at).format('LL')
    const createdTime = moment.utc(call.created_at).format('LT').split(' ')

    const getCallTypeMessage = (call_type) => {
        switch (call_type) {
            case 'answered':
                return `called`
            case 'missed':
                return `tried to call on to`
            case 'voicemail':
                return 'voicemailed on to'
            default:
                return ''
        }
    }

    const getDirectionIcon = (direction) => {
        let cIcon = CallIcon
        switch (direction) {
            case 'inbound':
                return <ArrowDownwardIcon className="small" fontSize="small" color="error" />
            case 'outbound':
                return <ArrowUpwardIcon className="small" fontSize="small" color="primary" />
            default:
                return ''
        }
    }

    const getPersonName = (number) => {
        const mobileNum = typeof number === 'number' ? number.toString() : number
        if (mobileNum) {
            return directory[mobileNum].name
        }
        return 'Unknown number'
    }

    const unArchiveCall = () => {
        const callId = call.id
        dispatch(unArchievedCall(callId))
    }

    return (
        <div className="activity-detail">
            <div className="activity-detail__header">{createdDate} </div>
            <div className="activity-detail__content">
                <div className="activity-detail__content__left">
                    <CallIcon fontSize="large" />
                    {getDirectionIcon(call.direction)}
                </div>
                <div className="activity-detail__content__middle">
                    <p className="from">{getPersonName(call.from)}</p>
                    <p className="to">{`${getCallTypeMessage(call.call_type)} ${getPersonName(call.to)}`}</p>
                </div>
                <div className="activity-detail__content__right">
                    {call.is_archived && (
                        <IconButton
                            alt="Restore/Unarchive Call Activity"
                            title="Restore/Unarchive Call Activity"
                            className="activity-detail__content__right__restore"
                            onClick={unArchiveCall}>
                            <RestoreFromTrashIcon fontSize="small" />
                        </IconButton>
                    )}
                    <div className="activity-detail__content__right__time">{createdTime[0]}</div>
                    <div className="activity-detail__content__right__day">{createdTime[1]}</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directory: state.airCall.directory,
    }
}

export default connect(mapStateToProps, null)(ActivityDetail)
