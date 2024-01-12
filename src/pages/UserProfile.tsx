import React from 'react'

import { useParams } from 'react-router-dom'
import UserProfilePage from '../components/UserProfilePage'

import classes from "./UserDataPage.module.css"

const UserProfile = () => {

    const {username} = useParams()

  return (
    <div className={classes.profileContainer}>
      {username && <UserProfilePage username = {username} />}
    </div>
  )
}

export default UserProfile
