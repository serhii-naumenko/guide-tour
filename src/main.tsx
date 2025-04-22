import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TourProvider } from './components/Tour';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TourProvider>
      <App />
    </TourProvider>
  </StrictMode>
);