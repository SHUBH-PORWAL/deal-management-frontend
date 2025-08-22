import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import DealsTable from '../Deals/DealTable';
import FilterControls from '../Deals/FilterControls';
import HeroSection from '../Dashboard/HeroSection';
import { fetchDeals } from '../services/api';

const Dashboard = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    assignee: 'all'
  });

  useEffect(() => {
    loadDeals();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [deals, filters]);

  const loadDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchDeals();
      
      if (response && response.deals) {
        setDeals(response.deals);
      } else {
        setDeals(Array.isArray(response) ? response : []);
      }
      
    } catch (err) {
      setError('Failed to load deals. Please try again later.');
      console.error('Error loading deals:', err);
      
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (!Array.isArray(deals)) {
      setFilteredDeals([]);
      return;
    }

    let filtered = [...deals];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(deal => {
        if (!deal.status) return false;
        return deal.status.toLowerCase().replace(/\s+/g, '') === 
               filters.status.toLowerCase().replace(/\s+/g, '');
      });
    }

    if (filters.assignee && filters.assignee !== 'all') {
      filtered = filtered.filter(deal => {
        if (!deal.assignee) return false;
        return deal.assignee.toLowerCase().includes(filters.assignee.toLowerCase());
      });
    }

    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter(deal => {
        const clientName = deal.clientName || '';
        const dealName = deal.dealName || '';
        const assignee = deal.assignee || '';
        
        return (
          clientName.toLowerCase().includes(searchTerm) ||
          dealName.toLowerCase().includes(searchTerm) ||
          assignee.toLowerCase().includes(searchTerm)
        );
      });
    }

    setFilteredDeals(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handleRefresh = () => {
    loadDeals();
  };

  const clearAllFilters = () => {
    setFilters({
      status: 'all',
      search: '',
      assignee: 'all'
    });
  };

  const getFilteredStats = () => {
    if (!Array.isArray(filteredDeals) || filteredDeals.length === 0) {
      return {
        totalDeals: 0,
        totalRevenue: 0,
        activeDeals: 0
      };
    }

    const totalRevenue = filteredDeals.reduce((sum, deal) => {
      return sum + (deal.budget || 0);
    }, 0);

    const activeDeals = filteredDeals.filter(deal => 
      deal.status && ['Negotiating', 'Active'].includes(deal.status)
    ).length;

    return {
      totalDeals: filteredDeals.length,
      totalRevenue,
      activeDeals
    };
  };

  const filteredStats = getFilteredStats();

  if (loading) {
    return (
      <div style={{ paddingTop: '80px' }}>
        <Container fluid className="px-4">
          <Row className="justify-content-center" style={{ minHeight: '60vh' }}>
            <Col xs={12} className="text-center d-flex flex-column justify-content-center align-items-center">
              <div className="loading-spinner mb-3"></div>
              <h5 className="text-muted mb-2">Loading Dashboard...</h5>
              <p className="text-muted">Please wait while we fetch your deals data.</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '60px' }}>
      <HeroSection />
      
      <Container fluid className="px-4">
        {error && (
          <Row className="mb-3">
            <Col>
              <Alert variant="danger" className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Error:</strong> {error}
                </div>
                <Button variant="outline-danger" size="sm" onClick={handleRefresh}>
                  <span className="me-1">🔄</span>
                  Retry
                </Button>
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
                <div>
                  <h5 className="mb-0">
                    Manage your <span className="text-primary">Deals</span>
                  </h5>
                  <small className="text-muted">
                    Track and manage your sales pipeline
                  </small>
                </div>
                <div className="d-flex gap-2">
                  {(filters.status !== 'all' || filters.search || filters.assignee !== 'all') && (
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={clearAllFilters}
                    >
                      <span className="me-1">🗑️</span>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </Card.Header>

              <Card.Body className="p-0">
                <FilterControls 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  dealsCount={filteredDeals.length}
                  totalRevenue={filteredStats.totalRevenue}
                />

                <DealsTable 
                  deals={filteredDeals} 
                  loading={loading}
                  onRefresh={handleRefresh}
                  error={error}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;