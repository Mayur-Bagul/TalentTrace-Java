import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Notifications from './Notifications'



const Notification = () => {
   toast.success('Notification successfully created!');
    return (
      <div>
        <Navbar />
        <Notifications/>
        <Notification/>
        <Footer />
      </div>
    )
  }