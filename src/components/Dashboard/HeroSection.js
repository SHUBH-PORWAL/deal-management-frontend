import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <Container fluid className="px-4">
                <Row className="align-items-center">
                    <Col lg={6} md={6}>
                        <div>
                            <p className="mb-2 text-uppercase" style={{ fontSize: '0.875rem', letterSpacing: '1px' }}>
                                Welcome!
                            </p>
                            <h1 className="hero-title">
                                Manage your <span style={{ color: '#60a5fa' }}>Deals</span>
                            </h1>
                            <Button variant="light" size="lg" className="me-3">
                                Get Started
                            </Button>
                        </div>
                    </Col>
                    <Col lg={6} md={6}>
                        <div className="d-flex justify-content-center">
                            <img
                                src={"/client-cover.png"}
                                alt="Hero Illustration"
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;