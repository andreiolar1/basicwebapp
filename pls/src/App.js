import React from 'react';
import NavigationBar from './navigation-bar';

import { Outlet } from "react-router-dom";

function App() {
    return (
        <div>
            <NavigationBar />
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
