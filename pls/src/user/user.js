import * as React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import { Card, Col, Row } from 'reactstrap';
import Table from "../commons/tables/table"
import PersonForm from "./user-form";

import * as API_USERS from "./api/user-api"

const columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },

];

const filters = [
    {
        accessor: 'name',
    },
    {
        accessor: 'email',
    }
];

class User extends React.Component {


    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            collapseForm: true,
            loadPage: false,
            errorStatus: 0,
            error: null,
            tableData: []
        };


    }

    toggleForm = () => {
        this.setState({ collapseForm: !this.state.collapseForm });
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        return API_USERS.getUsers((result, status, err) => {
            console.log(result);
            if (result !== null && status === 200) {
                result.forEach(x => {
                    this.setState({
                        tableData: [...this.state.tableData, {
                            name: x.name,
                            email: x.email,
                        }]
                    })
                });

            } else {
                console.log("Am prins o eroare!!!");
                this.setState({ errorStatus: status });
                this.setState({ error: err });

            }
        });
    }

    refresh() {
        this.forceUpdate()
    }

    render() {
        let pageSize = 5;
        return (
            <div>
                <Row>
                    <Col>
                        <Card body>
                            <Table
                                data={this.state.tableData}
                                columns={columns}
                            //search={filters}

                            />
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card body>
                            <div>
                                <PersonForm registerPerson={this.refresh}>

                                </PersonForm>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />}

            </div>
        );
    };

}

export default User;
