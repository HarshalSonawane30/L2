import React, { useEffect, useState } from 'react'
import { Container, Button, Row, Col, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  const allTopics = [
    { title: 'React Tips', desc: 'Best practices and patterns for building React apps.' },
    { title: 'JavaScript', desc: 'Modern JS features, tricks and performance tips.' },
    { title: 'Python', desc: 'Data science, scripting, and web backends.' },
    { title: 'DevOps', desc: 'CI/CD, Docker, Kubernetes and deployment guides.' },
    { title: 'UI/UX', desc: 'Design systems, accessibility, and prototyping.' },
    { title: 'Machine Learning', desc: 'Intro to ML, models, and practical examples.' },
    { title: 'Mobile', desc: 'React Native, Flutter and mobile best practices.' },
    { title: 'Web Security', desc: 'Secure coding, auth flows, and common vulnerabilities.' },
    { title: 'Career', desc: 'Resumes, interviews, and freelancing tips.' },
    { title: 'Databases', desc: 'SQL, NoSQL, and data modeling.' }
  ];

  const [related, setRelated] = useState([]);

  useEffect(() => {
    shuffleRelated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shuffleRelated = () => {
    const shuffled = [...allTopics].sort(() => 0.5 - Math.random()).slice(0, 6);
    setRelated(shuffled);
  };

  const [showAuthModal, setShowAuthModal] = useState(false);
  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <div className="landing-hero">
      <Container className="py-5">
        <div className="hero-inner text-center">
          <h1 className="display-4 mb-3">Learn & Let Learn</h1>
          <p className="lead mb-4">Connect, share knowledge, and grow with fellow learners.</p>
          <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
            <Button onClick={openAuthModal} variant="primary" size="lg">Get Started</Button>
            <Button as={Link} to="/signup" variant="outline-primary" size="lg">Sign Up</Button>
          </div>

          <Modal show={showAuthModal} onHide={closeAuthModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Welcome</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <p className="mb-3">Create a new account or sign in to continue.</p>
              <div className="d-flex justify-content-center gap-3">
                <Button as={Link} to="/signup" variant="primary" onClick={closeAuthModal}>Create Account</Button>
                <Button as={Link} to="/login" variant="outline-secondary" onClick={closeAuthModal}>Sign In</Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <div className="related-section mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Related Topics</h3>
            <Button variant="link" onClick={shuffleRelated}>Refresh</Button>
          </div>

          <Row xs={1} sm={2} md={3} className="g-3">
            {related.map((t, idx) => (
              <Col key={idx}>
                <Card className="related-card h-100">
                  <Card.Body>
                    <Card.Title>{t.title}</Card.Title>
                    <Card.Text>{t.desc}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted small">Trending • {Math.floor(Math.random() * 900 + 100)} members</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default LandingPage
