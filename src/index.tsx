import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';

/**
 * The root index file of my React application.
 *
 * This file serves as the entry point for my application and renders the main `App` component
 * wrapped in a `BrowserRouter`, enabling client-side routing.
 *
 * Behavior:
 * - It renders the main `App` component within a `BrowserRouter` to enable client-side routing.
 * - The application's root HTML element with the id "root" is used to mount the React app.
 *
 * Returns:
 * - Renders the main application content to the DOM.
 * 
 * @returns {void}
 */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

