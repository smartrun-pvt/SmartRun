import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';
import { registerSmartRunWebMcpTools } from './utils/webMcp';
import './index.css';

// Register read-only WebMCP tools for AI browser agents (Chrome/Lighthouse Agentic Browsing)
registerSmartRunWebMcpTools();

// Register Service Worker for offline resilience and product image caching
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);

