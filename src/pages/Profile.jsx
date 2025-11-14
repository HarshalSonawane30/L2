import React from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaEdit, FaPen, FaPlus, FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import './Profile.css';

function Profile() {
  const skills = ['React', 'JavaScript', 'Node.js', 'Python', 'Machine Learning', 'Data Science'];
  
  const posts = [
    {
      id: 1,
      content: 'Just completed an advanced course in Machine Learning!',
      likes: 45,
      comments: 12,
      date: '2 days ago'
    }
  ];

  return (
    <Container className="py-4">
      {/* Profile Header */}
      <Card className="mb-4 profile-header">
        <div className="profile-cover"></div>
        <Card.Body className="position-relative">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-picture"
          />
          <Button variant="light" className="edit-profile-btn">
            <FaEdit /> Edit Profile
          </Button>
          <h4 className="mt-4">John Doe</h4>
          <p className="text-muted">Full Stack Developer | AI Enthusiast | Technical Mentor</p>
          <p className="mb-2">San Francisco, CA</p>
          <div className="profile-stats">
            <span>458 connections</span> • 
            <span>123 posts</span>
          </div>
        </Card.Body>
      </Card>

      <Row>
        <Col md={8}>
          {/* About Section */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">About</h5>
                <Button variant="light" size="sm">
                  <FaPen />
                </Button>
              </div>
              <p>
                Passionate developer with 5 years of experience in full-stack development.
                Focused on creating educational content and mentoring aspiring developers.
              </p>
            </Card.Body>
          </Card>

          {/* Skills Section */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Skills</h5>
                <Button variant="light" size="sm">
                  <FaPlus /> Add
                </Button>
              </div>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <Badge key={index} bg="light" text="dark" className="skill-badge">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Experience Section */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Experience</h5>
                <Button variant="light" size="sm">
                  <FaPlus />
                </Button>
              </div>
              <div className="experience-item">
                <FaBriefcase className="experience-icon" />
                <div>
                  <h6>Senior Developer</h6>
                  <p className="text-muted mb-0">Tech Corp • 2020 - Present</p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Education Section */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Education</h5>
                <Button variant="light" size="sm">
                  <FaPlus />
                </Button>
              </div>
              <div className="experience-item">
                <FaGraduationCap className="experience-icon" />
                <div>
                  <h6>Computer Science</h6>
                  <p className="text-muted mb-0">University of Technology • 2016 - 2020</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {/* Recent Activity */}
          <Card>
            <Card.Body>
              <h5 className="mb-3">Recent Activity</h5>
              {posts.map(post => (
                <div key={post.id} className="activity-item">
                  <p>{post.content}</p>
                  <div className="d-flex justify-content-between text-muted">
                    <small>{post.likes} likes • {post.comments} comments</small>
                    <small>{post.date}</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;