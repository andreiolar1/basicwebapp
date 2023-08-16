import React, { useState } from 'react';
import validate from "./validators/login-validators";
import TextInput from "./fields/TextInput";
import Button from "react-bootstrap/Button";
import * as API_USERS from "./api/login-api";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";

function LoginForm() {
    const [formControls, setFormControls] = useState({
        id: {
            value: '',
            placeholder: 'id...',
            valid: true,
            touched: true,
            validationRules: {
                isRequired: false
            }
        },
        username: {
            value: '',
            placeholder: 'What is your username?...',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: true
            }
        },
        password: {
            value: '',
            placeholder: 'password...',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 3,
                isRequired: true
            }
        },
        role: {
            value: '',
            placeholder: 'role...',
            valid: true,
            touched: true,
            validationRules: {
                isRequired: false
            }
        }
    });

    const [errorStatus, setErrorStatus] = useState(0);
    const [error, setError] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const [pls, setPls] = useState(false);
    const [path, setPath] = useState('/');
    const [redirect, setRedirect] = useState(false);

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...formControls
        };

        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        console.log("Element: " + name + " validated: " + updatedFormElement.valid);

        updatedControls[name] = updatedFormElement;

        let newFormIsValid = true;

        for (let updatedFormElementName in updatedControls) {
            newFormIsValid = updatedControls[updatedFormElementName].valid && newFormIsValid;
        }

        setFormControls(updatedControls);
        setFormIsValid(newFormIsValid);
    };

    const handleSubmit = () => {
        console.log("New login:");
        console.log("username: " + formControls.username.value);
        console.log("password: " + formControls.password.value);

        let user = {
            username: formControls.username.value,
            password: formControls.password.value,
        };

        loginUser(user);
    };

    const loginUser = user => {
        console.log("Successfully");
        return API_USERS.login(user, (result, status, error) => {
            console.log(result);
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully");
                console.log(result);
                // Handle success
            } else {
                setPls(false);
                console.log("Am prins o eroare!!!");
                setErrorStatus(status);
                setError(error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Please log in</h1>
            <p> usernamess: </p>
            <TextInput
                name="username"
                placeholder={formControls.username.placeholder}
                value={formControls.username.value}
                onChange={handleChange}
                touched={formControls.username.touched}
                valid={formControls.username.valid}
            />
            {formControls.username.touched && !formControls.username.valid &&
                <div className={"error-message row"}> * username must have at least 3 characters </div>}

            <p> password: </p>
            <TextInput
                name="password"
                placeholder={formControls.password.placeholder}
                value={formControls.password.value}
                onChange={handleChange}
                touched={formControls.password.touched}
                valid={formControls.password.valid}
            />
            {formControls.password.touched && !formControls.password.valid &&
                <div className={"error-message row"}> * password must have at least 3 characters </div>}

            <p></p>
            <Button variant="success" type={"submit"} disabled={!formIsValid}>
                Login
            </Button>

            {errorStatus > 0 && <APIResponseErrorMessage errorStatus={errorStatus} error={error} />}
        </form>
    );
}

export default LoginForm;
