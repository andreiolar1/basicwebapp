import React, { useState } from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledAlert } from 'reactstrap';
import styles from '../styles/projectStyle.css';

const APIResponseErrorMessage = ({ error, errorStatus, className }) => {
    const [collapseForm, setCollapseForm] = useState(false);

    const toggleForm = () => {
        setCollapseForm(!collapseForm);
    };

    return (
        <div>
            <UncontrolledAlert color="danger">
                The request could not be processed!
                {errorStatus > 1 && <Button color="link" onClick={toggleForm}>Details...</Button>}
            </UncontrolledAlert>

            {errorStatus > 1 &&
                <Modal isOpen={collapseForm} toggle={toggleForm} className={className}>
                    <ModalHeader toggle={toggleForm} className={styles.errorTitle}> Server side error information: </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="3"> Time: </Col>   <Col xs="auto" className={styles.errorText}>{error.timestamp} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Resource : </Col>   <Col xs="auto" className={styles.errorText}>{error.entity} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Error : </Col>   <Col xs="auto" className={styles.errorText}>{error.statusCode}  </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Message : </Col>   <Col xs="auto" className={styles.errorText}>{error.statusMessage} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Path : </Col>   <Col xs="auto" className={styles.errorText}>{error.requestedUri} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Details : </Col>   <Col xs="auto" className={styles.errorText}>
                                {error.details}
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggleForm}>Cancel</Button>
                    </ModalFooter>
                </Modal>}
        </div>
    );
};

export default APIResponseErrorMessage;
