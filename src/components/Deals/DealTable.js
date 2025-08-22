import React from 'react';
import { Accordion, Badge, Dropdown, Button } from 'react-bootstrap';

const DealsAccordion = ({ deals, loading, onRefresh }) => {
  const groupDealsByStatus = (deals) => {
    return deals.reduce((groups, deal) => {
      if (!groups[deal.status]) groups[deal.status] = [];
      groups[deal.status].push(deal);
      return groups;
    }, {});
  };

  const statusConfig = {
    'Negotiating': { color: 'warning'},
    'Active': { color: 'success'},
    'Kickedback': { color: 'danger' },
    'Closed Won': { color: 'primary'}
  };

  const groupedDeals = groupDealsByStatus(deals);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading deals...</p>
      </div>
    );
  }

  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      {Object.keys(groupedDeals).map((status, index) => (
        <Accordion.Item eventKey={index.toString()} key={status}>
          <Accordion.Header>
            {status}{" "}
            <Badge bg={statusConfig[status]?.color || 'secondary'} className="ms-2">
              {groupedDeals[status].length}
            </Badge>
          </Accordion.Header>
          <Accordion.Body>
            {groupedDeals[status].map((deal) => (
              <div 
                key={deal.id} 
                className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
              >
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle bg-primary text-white fw-bold me-3 d-flex align-items-center justify-content-center"
                    style={{ width: "36px", height: "36px" }}
                  >
                    {deal.clientInitials}
                  </div>
                  <div>
                    <div className="fw-semibold">{deal.clientName}</div>
                    <small className="text-muted">{deal.dealName}</small>
                  </div>
                </div>

                <div className="fw-bold text-success">
                  ${deal.budget}
                </div>

                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle bg-secondary text-white fw-bold me-2 d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px" }}
                  >
                    {deal.assigneeInitials}
                  </div>
                  <span>{deal.assignee}</span>
                </div>

                <Dropdown align="end">
                  <Dropdown.Toggle 
                    variant="link" 
                    className="text-muted border-0 shadow-none p-0"
                  >
                    ⋮
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>👁️ View</Dropdown.Item>
                    <Dropdown.Item>✏️ Edit</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default DealsAccordion;
