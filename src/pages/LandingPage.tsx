
/**
 * `Landing Page` is a React component that serves as a home page of the application.
 *
 * Behavior:
 * - displays the name of the application as well as the tagline
 * - draws attention to the features of the application
 *
 * @returns {JSX.Element} Landing page with name, tagline and features
 */

import classes from './LandingPage.module.css'

const LandingPage = () => {
  return (
    <div>
        <div className={classes.landingcontainer}>
          <h1 className={classes.landingtitle}>Thread Talk</h1>
          <p className={classes.landingsubtitle}>Dive into the world of discussion</p>
        </div>
        <div className={classes.featuresguide}>
            <h2>Explore, engage, and express with ease.</h2>
            <ul>
                <li>Discovering posts, comments, and author profiles at your leisure</li>
                <li>Share Your Thoughts</li> 
                <li>Join the Conversation</li>
                <li>Discover with Tags</li>
                <li>Curate Your Favorites</li>
                <li>Personalize Your Profile</li>
                <li>View author profiles</li>
                <li>Full Control Over Your Posts</li>

            </ul>
        </div>

    </div>
  );
};

export default LandingPage;
