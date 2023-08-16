import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('content');
export const root = createRoot(container!); // createRoot(container!) if you use TypeScript