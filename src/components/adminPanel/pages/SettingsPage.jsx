import React from 'react'

import Header from '../common_components/Header'
import Profile from '../settings/Profile'
import Notification from '../settings/Notification'
import Security from '../settings/Security'
import ConnectedAccounts from '../settings/ConnectedAccounts'
import DangerZone from '../settings/DangerZone'

const SettingsPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
            <Header title="Settings" />

            <main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
                <Profile />
                <Notification />
                <Security />
                <ConnectedAccounts />
                <DangerZone/>
            </main>
        </div>
    )
}

export default SettingsPage