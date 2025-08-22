import React from 'react';
import { Row, Col, Form, InputGroup, Badge, Button } from 'react-bootstrap';

const FilterControls = ({ filters, onFilterChange, dealsCount }) => {
    const handleInputChange = (field, value) => {
        onFilterChange({ [field]: value });
    };


    return (
        <div className="filter-controls m-3">
            <Row className="align-items-center mb-3">
                <Col md={4}>
                    <div className="d-flex align-items-center">
                        <h6 className="mb-0 me-2">My Deals</h6>
                        <Badge bg="primary" className="me-3">{dealsCount}</Badge>
                        <span className="text-muted small">All clients</span>
                    </div>
                </Col>

            </Row>

            <Row className="align-items-center g-2 flex-nowrap overflow-auto">
                <Col md="auto">
                    <Form.Group>
                        <Form.Label className="small fw-semibold text-muted">Pipeline</Form.Label>
                        <div className="d-flex align-items-center">
                            <span className="me-2">📊</span>
                            <span className="small">Pipeline View</span>
                        </div>
                    </Form.Group>
                </Col>

                <Col md="auto">
                    <Form.Group>
                        <Form.Label className="small fw-semibold text-muted">List</Form.Label>
                        <div className="d-flex align-items-center">
                            <span className="me-2">📋</span>
                            <span className="small text-primary fw-bold">List View</span>
                        </div>
                    </Form.Group>
                </Col>

                <Col md="auto">
                    <Form.Group>
                        <Form.Label className="small fw-semibold text-muted">Summary</Form.Label>
                        <div className="text-muted small">
                            Total Deals: <strong>{dealsCount}</strong> | Total Revenue in Pipeline:{" "}
                            <strong>$45,847</strong>
                        </div>
                    </Form.Group>
                </Col>

                <Col className="flex-grow-1" md={3}>
                    <Form.Group>
                        <Form.Label className="small fw-semibold text-muted">Search</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-white border-end-0">
                                <i className="text-muted">🔍</i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search deals, clients, assignees..."
                                value={filters.search}
                                onChange={(e) => handleInputChange("search", e.target.value)}
                                className="border-start-0"
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>

                <Col md="auto">
                    <Form.Group>
                        <Form.Label className="small fw-semibold text-muted">Status</Form.Label>
                        <Form.Select
                            value={filters.status}
                            onChange={(e) => handleInputChange("status", e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="negotiating">Negotiating</option>
                            <option value="active">Active</option>
                            <option value="kickedback">Kicked Back</option>
                            <option value="closed won">Closed Won</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md="auto">
                    <Form.Group>
                        <Form.Label className="small fw-semibold text-muted">Assignee</Form.Label>
                        <Form.Select
                            value={filters.assignee}
                            onChange={(e) => handleInputChange("assignee", e.target.value)}
                        >
                            <option value="all">All Assignees</option>
                            <option value="michael speed">Michael Speed</option>
                            <option value="john doe">John Doe</option>
                            <option value="alice miller">Alice Miller</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

        </div>
    );
};

export default FilterControls;