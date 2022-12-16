import React from 'react'
import './Footer.scss'
import CallIcon from '@mui/icons-material/Call'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import SettingsIcon from '@mui/icons-material/Settings'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import AppsIcon from '@mui/icons-material/Apps'
import Fab from '@mui/material/Fab'

const Footer = (props) => {
    const { callCount } = props
    return (
        <div className="footer">
            <div className="footer__content">
                <div className="footer__content__btn-wrapper">
                    <CallIcon />
                    <div className="footer__content__btn-wrapper__call-count">{callCount}</div>
                </div>
                <div className="footer__content__btn-wrapper">
                    <PermIdentityIcon />
                </div>
                <div className="footer__content__btn-wrapper">
                    <div className="footer__content__btn-wrapper__circle">
                        <div className="footer__content__btn-wrapper__circle__green">
                            <AppsIcon />
                        </div>
                    </div>
                </div>
                <div className="footer__content__btn-wrapper">
                    <SettingsIcon />
                </div>
                <div className="footer__content__btn-wrapper">
                    <RadioButtonCheckedIcon />
                </div>
            </div>
        </div>
    )
}

export default Footer
