import React from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FaThumbsUp, FaComment, FaShare, FaImage, FaEllipsisH, FaCode, FaBrain, FaPalette } from 'react-icons/fa';
import './HomePage.css';

const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      role: "Full Stack Developer | Course Creator",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      verified: true
    },
    content: `🚀 Just launched my new course on Modern Web Development!

🔥 What you'll learn:
• React 18 with Hooks
• Next.js 13 Features
• TypeScript Best Practices
• Advanced State Management

💡 Perfect for developers ready to level up!

#WebDev #React #Programming`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    likes: 245,
    comments: 56,
    shares: 23,
    time: "2 hours ago",
    type: "course_launch"
  },
  {
    id: 2,
    user: {
      name: "Alex Kumar",
      role: "AI Engineer @ TechCorp",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      verified: true
    },
    content: `🎯 Today's AI Insight: Understanding Neural Networks

🧠 3 Key Concepts Everyone Should Know:
1. Neurons & Layers
2. Activation Functions
3. Backpropagation

💭 Think of neural networks as your brain's digital twin - constantly learning and adapting!

Who's curious to learn more? Drop a 🤖 below!

#ArtificialIntelligence #MachineLearning #Tech`,
    likes: 189,
    comments: 42,
    shares: 12,
    time: "4 hours ago",
    type: "tip"
  },
  {
    id: 3,
    user: {
      name: "Maria Garcia",
      role: "UX Design Lead",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      verified: true
    },
    content: `✨ Design Challenge Completed!

Just wrapped up a 30-day UI/UX challenge and learned so much! Here's my favorite project - a learning platform redesign.

Swipe to see the before/after! 👉

#DesignThinking #UX #UserInterface`,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    likes: 312,
    comments: 89,
    shares: 45,
    time: "6 hours ago",
    type: "achievement"
  }
];

function HomePage() {
  return (
    <Container className="home-container">
      {/* Feed Header */}
      <div className="feed-header text-center">
        <h4 className="mb-2">Welcome to Your Learning Feed</h4>
        <p className="mb-0">Discover, Learn, and Share Knowledge</p>
      </div>

      {/* Create Post Section */}
      <Card className="post-create-card">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <img
              src="https://randomuser.me/api/portraits/men/88.jpg"
              alt="Profile"
              className="post-avatar"
            />
            <Form.Control
              type="text"
              placeholder="Share your knowledge or ask a question..."
              className="post-input ms-3"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <Button variant="light" className="post-btn">
                <FaImage /> Photo
              </Button>
              <Button variant="light" className="post-btn">
                <FaCode /> Code
              </Button>
              <Button variant="light" className="post-btn">
                <FaBrain /> Poll
              </Button>
            </div>
            <Button variant="primary" className="px-4 rounded-pill">Share</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Posts Feed Section */}
      <div className="feed-section">
        <div className="post-filters mb-4 d-flex gap-3">
          <Button 
            variant="outline-primary" 
            className="rounded-pill px-4"
            active
          >
            All Posts
          </Button>
          <Button 
            variant="outline-primary" 
            className="rounded-pill px-4"
          >
            Courses
          </Button>
          <Button 
            variant="outline-primary" 
            className="rounded-pill px-4"
          >
            Tips & Insights
          </Button>
          <Button 
            variant="outline-primary" 
            className="rounded-pill px-4"
          >
            Achievements
          </Button>
        </div>

        {/* Posts Feed */}
        <div className="posts-container">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className={`post-card ${post.type}-post animate__animated animate__fadeIn`}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex">
                    <div className="position-relative">
                      <img
                        src={post.user.image}
                        alt={post.user.name}
                        className="post-avatar"
                      />
                      {post.user.verified && (
                        <span className="verified-badge">✓</span>
                      )}
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">{post.user.name}</h6>
                      <p className="text-muted small mb-0">{post.user.role}</p>
                      <small className="text-muted">{post.time}</small>
                    </div>
                  </div>
                  <Button variant="light" size="sm" className="rounded-circle post-menu-btn">
                    <FaEllipsisH />
                  </Button>
                </div>
                
                <div className="post-content mb-3">
                  {post.content.split('\n').map((text, index) => (
                    <p key={index} className="mb-1">
                      {text}
                    </p>
                  ))}
                </div>

                {post.image && (
                  <div className="post-image-container mb-3">
                    <img src={post.image} alt="Post content" className="post-image" />
                  </div>
                )}

                <div className="post-stats d-flex align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div className="reaction-icons">
                      <span className="reaction like">👍</span>
                      <span className="reaction heart">❤️</span>
                      <span className="reaction celebrate">🎉</span>
                    </div>
                    <span className="ms-2">{post.likes}</span>
                  </div>
                  <div className="ms-auto">
                    <span className="me-3">{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <Button variant="light" className="action-btn">
                    <FaThumbsUp /> Like
                  </Button>
                  <Button variant="light" className="action-btn">
                    <FaComment /> Comment
                  </Button>
                  <Button variant="light" className="action-btn">
                    <FaShare /> Share
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default HomePage;