import React from 'react'
import UserDataForm from '../components/UserDataForm'
import LogoutButton from '../components/LogoutButton'

import classes from "./UserDataPage.module.css"

import { useAuth } from '../store/auth-context'
import { Link } from 'react-router-dom'

const UserDataPage = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn){
      return <p> Please <Link to="/login">log in</Link> to view profile </p>
    }

  return (
    <div className={classes.profileContainer}>
      {isLoggedIn && <UserDataForm />}
      {isLoggedIn && <LogoutButton />}
    </div>
  )
}

export default UserDataPage
