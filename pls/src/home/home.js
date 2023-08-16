import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImg from './../commons/images/icon.png';
import { Button, Container } from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh', // Adjust the height as needed
    backgroundImage: `url(${BackgroundImg})`,
};

const textStyle = { color: 'white' };

const jumboStyle = {
    paddingLeft: '48px',
    paddingRight: '48px',
    paddingTop: '60px',
    paddingBottom: '60px',
};

function Home() {
    return (
        <div style={backgroundStyle}>
            <div style={jumboStyle}>
                <Container fluid>
                    <h1 className="display-3" style={textStyle}>
                        Integrated Medical Monitoring Platform for Home-care assistance
                    </h1>
                    <p className="lead" style={textStyle}>
                        <b>
                            Enabling real time monitoring of patients, remote-assisted care services and smart intake
                            mechanism for prescribed medication.
                        </b>
                    </p>
                    <hr className="my-2" />
                    <p style={textStyle}>
                        <b>
                            This assignment represents the first module of the distributed software system "Integrated
                            Medical Monitoring Platform for Home-care assistance that represents the final project for the
                            Distributed Systems course.
                        </b>
                    </p>
                    <p className="lead">
                        <Link to="/homepage">
                            <Button color="primary">Learn More</Button>
                        </Link>
                    </p>
                </Container>
            </div>
        </div>
    );
}

export default Home;