/**
 * `LogOut` is a React component that provides a button to log out a user.
 *
 * This component allows the user to click a "Log Out" button, which triggers a log out process.
 * When clicked, the user's authentication token is removed from local storage, and the user's
 * authentication state is updated to "not logged in."
 *
 *
 * Behavior:
 * - Displays a "Log Out" button.
 * - When the button is clicked, it triggers a log out process:
 *   - Removes the user's authentication token from local storage.
 *   - Sets the user's authentication state to "not logged in."
 *
 * @returns {JSX.Element} A "Log Out" button.
 */

import LogoutButton from '../components/LogoutButton'

const LogOut = () => {
    
  return (
    <div>
      <LogoutButton />
    </div>
  )
}

export default LogOut
