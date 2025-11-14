import React from 'react';
import { Container, Card, Button, Row, Col, Nav } from 'react-bootstrap';
import { FaUserPlus, FaUsers, FaBookmark } from 'react-icons/fa';
import './Network.css';

function Network() {
  const connections = [
    {
      id: 1,
      name: 'Sarah Wilson',
      title: 'Full Stack Developer',
      mutual: 12,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      title: 'UI/UX Designer',
      mutual: 8,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      name: 'Emily Brown',
      title: 'Data Scientist',
      mutual: 15,
      image: 'https://via.placeholder.com/100'
    }
  ];

  return (
    <Container className="py-4">
      {/* Network Stats */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4">Your Network</h5>
          <Row>
            <Col xs={6} md={3} className="text-center mb-3">
              <FaUsers className="network-icon" />
              <div className="stat-label">Connections</div>
              <div className="stat-value">458</div>
            </Col>
            <Col xs={6} md={3} className="text-center mb-3">
              <FaUserPlus className="network-icon" />
              <div className="stat-label">Pending</div>
              <div className="stat-value">3</div>
            </Col>
            <Col xs={6} md={3} className="text-center mb-3">
              <FaBookmark className="network-icon" />
              <div className="stat-label">Saved</div>
              <div className="stat-value">12</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Connection Requests */}
      <h5 className="mb-3">Pending Requests</h5>
      {connections.map((connection) => (
        <Card key={connection.id} className="mb-3 connection-card">
          <Card.Body>
            <div className="d-flex align-items-center">
              <img
                src={connection.image}
                alt={connection.name}
                className="rounded-circle connection-img"
              />
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">{connection.name}</h6>
                <p className="text-muted mb-1">{connection.title}</p>
                <small className="text-muted">{connection.mutual} mutual connections</small>
              </div>
              <div className="d-flex gap-2">
                <Button variant="primary">Accept</Button>
                <Button variant="light">Ignore</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Recommended Connections */}
      <h5 className="mt-4 mb-3">People You May Know</h5>
      <Row>
        {connections.map((connection) => (
          <Col key={connection.id} md={4} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <img
                  src={connection.image}
                  alt={connection.name}
                  className="rounded-circle mb-3 recommended-img"
                />
                <h6>{connection.name}</h6>
                <p className="text-muted small mb-2">{connection.title}</p>
                <Button variant="outline-primary" className="w-100">
                  <FaUserPlus className="me-2" /> Connect
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Network;