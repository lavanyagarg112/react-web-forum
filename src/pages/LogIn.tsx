import React, { useState, FormEvent } from 'react';
import classes from '../components/posts/NewPostForm.module.css'
import { useNavigate } from 'react-router-dom';

import Card from '../components/ui/Card';
import { useAuth } from '../store/auth-context';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const navigate = useNavigate();

  const { setIsLoggedIn, setUser  } = useAuth(); 

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            // username,
            email,
            password,
          }
        }),
        credentials: 'include', // Required for cookies to be sent with the request
      });

      const data = await response.json();
      if (response.ok) {
        // Login successful
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setUser(data.user);
        navigate('/user-data'); // Navigate to the home page after login
      } else {
        // Handle login failure
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again later.');
    }
  };

  return (
    <section>
        <h1>Login</h1>
        <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
              {/* <div className={classes.control}>
                <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
              </div> */}
              <div className={classes.control}>
                <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
              </div>
              <div className={classes.control}>
                <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
              </div>

              <div className={classes.actions}><button type="submit">Login</button></div>
              {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

            </form>
        </Card>
    </section>
  );
};

export default Login;

