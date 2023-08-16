import React, { useState, useEffect } from 'react';
import styles from '../styles/projectStyle.css';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const componentDidCatch = (error, info) => {
            setHasError(true);
            console.log("error:" + error);
            console.log("info:" + info);
        };

        window.addEventListener("error", componentDidCatch);

        return () => {
            window.removeEventListener("error", componentDidCatch);
        };
    }, []);

    if (hasError) {
        return <h1 className={styles.errorTitle}>An error occurred at component level.</h1>;
    }

    return children;
};

export default ErrorBoundary;
