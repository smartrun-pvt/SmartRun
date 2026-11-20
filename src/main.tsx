import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';
import { registerSmartRunWebMcpTools } from './utils/webMcp';
import { syncSafeAreaCssVariables } from './utils/safeArea';
import './index.css';

// Resolve native/web safe-area CSS variables synchronously before first paint
syncSafeAreaCssVariables();

// Register read-only WebMCP tools for AI browser agents (Chrome/Lighthouse Agentic Browsing)
registerSmartRunWebMcpTools();

// Register Service Worker for offline resilience and product image caching
registerServiceWorker();

// Signal to index.html boot watchdog that the React bundle loaded and mounted cleanly
if (typeof window !== 'undefined') {
  (window as any).__SMARTRUN_APP_MOUNTED__ = true;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);

