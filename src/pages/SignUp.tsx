import React, { useState, FormEvent } from 'react';
import classes from '../components/posts/NewPostForm.module.css'
import { useNavigate } from 'react-router-dom';

import Card from '../components/ui/Card';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [signUpError, setSignUpError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  // Check if passwords match
  if (password !== confirmPassword) {
    setSignUpError("Passwords don't match.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          password_confirmation: confirmPassword 
        }
      }),
    });

    if (!response.ok) {
      // If the response is not ok, we assume it's an error and throw it
      const errorResponse = await response.json();
      const errorText = errorResponse?.errors?.email ? errorResponse.errors.email[0] : 'An error occurred during sign up.';
      throw new Error(errorText);
    }

    const data = await response.json();
    navigate('/'); 

  } catch (error) {
    if (error instanceof Error) {
      // Now we know it's an Error instance
      setSignUpError(error.message);
    } else {
      // If we're not sure what the error is, handle accordingly
      setSignUpError("An unexpected error occurred.");
    }
  }
};


  return (
    <section>
        <h1>Sign Up</h1>
        <Card>
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.control}>
                <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
              </div>
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
              <div className={classes.control}>
              <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    />
              </div>
              <button type="submit">Sign Up</button>
              {signUpError && <div style={{ color: 'red' }}>{signUpError}</div>}
            </form>
        </Card>
    </section>
  );
};

export default Signup;

