import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home/home';
import Login from './login/login';
import User from './user/user';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
           
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },

        ],
    
    },
]);

root.render(
    <RouterProvider router={router}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </RouterProvider>
);
   