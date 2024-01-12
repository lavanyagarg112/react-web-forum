import React from 'react'

import { useParams } from 'react-router-dom'
import UserProfilePage from '../components/UserProfilePage'

import classes from "./UserDataPage.module.css"

import { useAuth } from '../store/auth-context'

import { Link } from 'react-router-dom'

const UserProfile = () => {

    const {username} = useParams()
    const {user} = useAuth()



  return (
    <div>
      <div className={classes.profileContainer}>
        {username && <UserProfilePage username = {username} />}
      </div>
    </div>
  )
}

export default UserProfile
