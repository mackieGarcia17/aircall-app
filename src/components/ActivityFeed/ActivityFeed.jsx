import React from 'react'
import './ActivityFeed.scss'
import ActivityDetail from '../ActivityDetail/ActivityDetail.jsx'

const ActivityFeed = (props) => {
    const { calls } = props
    return (
        <div className="activity-feed">
            {calls.map((c) => {
                return <ActivityDetail key={c.id} call={c} />
            })}
        </div>
    )
}

export default ActivityFeed
