
import classes from './LandingPage.module.css'

const LandingPage = () => {
  return (
    <div className={classes.landingcontainer}>
      <h1 className={classes.landingtitle}>Thread Talk</h1>
      <p className={classes.landingsubtitle}>Dive into the world of discussion.</p>
    </div>
  );
};

export default LandingPage;
