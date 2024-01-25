/**
 * `UserProfile` is a React component that displays the user profile page.
 *
 * This component fetches user information based on the username provided in the URL parameters and displays
 * the user's profile, including their display name, bio, and a list of their posts.
 *
 * Behavior:
 * - Retrieves the `username` from the URL parameters using the `useParams` hook from `react-router-dom`.
 * - Uses the `UserProfilePage` component to display the user's profile information and posts.
 * - If the `username` is not provided, it won't display any profile information.
 *
 * @returns {JSX.Element} The user profile page with user information and posts.
 */

import { useParams } from 'react-router-dom'
import UserProfilePage from '../components/UserProfilePage'
import classes from "./UserDataPage.module.css"
import { useAuth } from '../store/auth-context'


const UserProfile = () => {

    const {username} = useParams()


  return (
    <div>
      <div className={classes.profileContainer}>
        {username && <UserProfilePage username = {username} />}
      </div>
    </div>
  )
}

export default UserProfile
