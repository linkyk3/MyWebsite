import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

// Suppress non-Error unhandled rejections from Replit dev plugins (cartographer /
// dev-banner) so they don't surface as a crash overlay in development.
window.addEventListener('unhandledrejection', (event) => {
  if (!(event.reason instanceof Error)) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(<App />);
