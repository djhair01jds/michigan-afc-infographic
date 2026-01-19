import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/react';
import posthog from 'posthog-js';
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

// ============================================
// SENTRY ERROR TRACKING
// ============================================
if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.feedbackIntegration({
        colorScheme: "system",
        enableScreenshot: true,
      }),
    ],
    tracesSampleRate: 1.0,
  });
  console.log('✓ Sentry initialized');
} else {
  console.warn('⚠ Sentry DSN not found - add to .env.local');
}

// ============================================
// POSTHOG ANALYTICS
// ============================================
if (process.env.REACT_APP_POSTHOG_KEY) {
  posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
    capture_pageview: true,
  });
  console.log('✓ PostHog initialized');
} else {
  console.warn('⚠ PostHog key not found - add to .env.local');
}

// ============================================
// WEB VITALS MONITORING
// ============================================
const sendToAnalytics = (metric: any) => {
  console.log(`📊 Web Vital - ${metric.name}:`, metric.value, `(${metric.rating})`);
  
  // Send to PostHog if available
  if (typeof posthog !== 'undefined' && posthog.capture) {
    posthog.capture('web_vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
getFCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// ============================================
// RENDER APP
// ============================================
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
