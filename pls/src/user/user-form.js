import * as React from 'react';
import validate from "./validators/user-validators";
import TextInput from "./fields/TextInput";
import Button from "react-bootstrap/Button";
import * as API_USERS from "./api/user-api";
import  APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";


class UserForm extends React.Component{


    constructor(props){
        super(props);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

           formControls : {

               name: {
                   value: '',
                   placeholder: 'What is your name?...',
                   valid: false,
                   touched: false,
                   validationRules: {
                       minLength: 3,
                       isRequired: true
                   }
               },

               email: {
                   value: '',
                   placeholder: 'Email...',
                   valid: false,
                   touched: false,
                   validationRules: {
                       emailValidator: true
                   }
               },

               iban: {
                   value: '',
                   placeholder: 'RO1234...',
                   valid: false,
                   touched: false,

               },
               address: {
                   value: '',
                   placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                   valid: false,
                   touched: false,

               },
           }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }

    componentDidMount() {

    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };

        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        console.log("Element: " +  name + " validated: " + updatedFormElement.valid);

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };

    registerPerson=(user)=>{
        return API_USERS.postUser(user, (result, status, error1) => {
            console.log(result);

            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.props.refresh();
            } else {
                this.setState({ errorStatus:  status, error : error1});
                
            }
        });
    }



    handleSubmit=()=>{

        console.log("New person data:");
        console.log("Name: " + this.state.formControls.name.value);
        console.log("Email: " + this.state.formControls.email.value);
        console.log("IBAN: " + this.state.formControls.iban.value);
        console.log("Address: " + this.state.formControls.address.value);

        let user = {
            name: this.state.formControls.name.value,
            email : this.state.formControls.email.value,
            iban: this.state.formControls.iban.value,
            address: this.state.formControls.address.value
        };

        this.registerPerson(user);
    }

    render() {
        return (

          <form onSubmit={this.handleSubmit}>

              <h1>Insert new person</h1>

              <p> Name: </p>

              <TextInput name="name"
                         placeholder={this.state.formControls.name.placeholder}
                         value={this.state.formControls.name.value}
                         onChange={this.handleChange}
                         touched={this.state.formControls.name.touched}
                         valid={this.state.formControls.name.valid}
              />
              {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
              <div className={"error-message row"}> * Name must have at least 3 characters </div>}

              <p> Email: </p>
              <TextInput name="email"
                         placeholder={this.state.formControls.email.placeholder}
                         value={this.state.formControls.email.value}
                         onChange={this.handleChange}
                         touched={this.state.formControls.email.touched}
                         valid={this.state.formControls.email.valid}
              />
              {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
              <div className={"error-message"}> * Email must have a valid format</div>}


              <p> IBAN: </p>
              <TextInput name="iban"
                         placeholder={this.state.formControls.iban.placeholder}
                         value={this.state.formControls.iban.value}
                         onChange={this.handleChange}
                         touched={this.state.formControls.iban.touched}
                         valid={this.state.formControls.iban.valid}
              />

              <p> Address: </p>
              <TextInput name="address"
                         placeholder={this.state.formControls.address.placeholder}
                         value={this.state.formControls.address.value}
                         onChange={this.handleChange}
                         touched={this.state.formControls.address.touched}
                         valid={this.state.formControls.address.valid}
              />


              <p></p>
              <Button variant="success"
                      type={"submit"}
                      disabled={!this.state.formIsValid}>
                  Submit
              </Button>

              {this.state.errorStatus > 0 &&
              <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>}

          </form>

        );
    }
}

export default UserForm;
