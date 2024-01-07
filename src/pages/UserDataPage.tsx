import React from 'react'
import UserDataForm from '../components/UserDataForm'
import LogoutButton from '../components/LogoutButton'

import { useAuth } from '../store/auth-context'

const UserDataPage = () => {
    const { isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn && <UserDataForm />}
      {isLoggedIn && <LogoutButton />}
    </div>
  )
}

export default UserDataPage
