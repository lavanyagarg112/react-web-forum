/**
 * `UserDataPage` is a React component that displays user data and a profile form.
 *
 * This component allows authenticated users to view and update their profile information.
 *
 * Behavior:
 * - Displays user data and a profile form when the user is authenticated.
 * - Shows a message to prompt users to log in when they are not authenticated.
 *
 * @returns {JSX.Element} A component that displays user data and a profile form or a log-in prompt.
 *
 */


import UserDataForm from '../components/UserDataForm'
import classes from "./UserDataPage.module.css"
import { useAuth } from '../store/auth-context'
import { Link } from 'react-router-dom'

const UserDataPage = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn){
      return <p> Please <Link to="/login">log in</Link> to view profile </p>
    }

  return (
    <div>
      <div className={classes.profileContainer}>
        {isLoggedIn && <UserDataForm />}
      </div>
    </div>
  )
}

export default UserDataPage
