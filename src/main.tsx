import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import RocketPortal from './RocketPortal';
import './styles.css';
import './32-Rocket-Background.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <RocketPortal />
  </React.StrictMode>
);
