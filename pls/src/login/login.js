import React, { useState, useEffect } from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import { Card, Col, Row } from 'reactstrap';
import LoginForm from "./login-form";
import  API_Login from "./api/login-api";

function Login() {
    const [redirect, setRedirect] = useState(false);
    const [collapseForm, setCollapseForm] = useState(true);
    const [loadPage, setLoadPage] = useState(false);
    const [errorStatus, setErrorStatus] = useState(0);
    const [error, setError] = useState(null);

    const toggleForm = () => {
        setCollapseForm(!collapseForm);
    };

    useEffect(() => {
        // Effect to run on component mount
        // You can fetch data here if needed
        // this.fetchDoctors();
    }, []);

    const refresh = () => {
        // You can implement the logic here if needed
        // this.forceUpdate()
    };

    return (
        <div>
            <Row>
                <Col>
                    <Card body>
                        <div>
                            <LoginForm />
                        </div>
                    </Card>
                </Col>
            </Row>

            {errorStatus > 0 && <APIResponseErrorMessage errorStatus={errorStatus} error={error} />}
        </div>
    );
}

export default Login;
