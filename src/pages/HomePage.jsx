import React, { useState } from 'react';
import { Container, Card, Button, Form, Modal } from 'react-bootstrap';
import { 
  FaThumbsUp, 
  FaComment, 
  FaShare, 
  FaImage, 
  FaEllipsisH, 
  FaCode, 
  FaBrain,
  FaUserPlus,
  FaUsers,
  FaHeart,
  FaReply,
  FaPaperPlane,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaLink,
  FaCopy,
  FaEnvelope
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Fixed: v6+ correct hook
import { isAuthenticated, requireAuth } from '../utils/authGuard';
import axios from 'axios'; // Now works after npm install axios
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

const communitySuggestions = [
  {
    id: 1,
    name: "React Developers Hub",
    members: 15420,
    description: "Connect with React developers worldwide",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=100",
    category: "Frontend"
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    members: 12850,
    description: "Explore the future of artificial intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100",
    category: "AI/ML"
  },
  {
    id: 3,
    name: "Full Stack Developers",
    members: 22100,
    description: "From frontend to backend, we've got you covered",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100",
    category: "Full Stack"
  },
  {
    id: 4,
    name: "UX/UI Design Community",
    members: 18750,
    description: "Design thinking and user experience excellence",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100",
    category: "Design"
  }
];

const userSuggestions = [
  {
    id: 1,
    name: "Emma Rodriguez",
    role: "Senior Software Engineer",
    company: "Google",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    mutualConnections: 12,
    skills: ["React", "Node.js", "Python"]
  },
  {
    id: 2,
    name: "David Kim",
    role: "Product Manager",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    mutualConnections: 8,
    skills: ["Product Strategy", "Agile", "Analytics"]
  },
  {
    id: 3,
    name: "Lisa Chen",
    role: "Data Scientist",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    mutualConnections: 15,
    skills: ["Python", "Machine Learning", "SQL"]
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "DevOps Engineer",
    company: "Netflix",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    mutualConnections: 6,
    skills: ["AWS", "Docker", "Kubernetes"]
  }
];

function HomePage() {
  const navigate = useNavigate(); // Correct hook for React Router v6+
  
  // State for interactive features
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [postComments, setPostComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(new Set());
  const [joinedCommunities, setJoinedCommunities] = useState(new Set());
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePostId, setSharePostId] = useState(null);

  const handleJoinCommunity = async () => {
    if (!requireAuth(navigate, 'join-community')) return;
    try {
      // Example backend call (replace with your actual API endpoint)
      const response = await axios.post('/api/join-community', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Example auth
        }
      });

      if (response.data.success || response.status === 200) {
        // Redirect to community page on success
        navigate('/community');
      }
    } catch (error) {
      console.error('Join community failed:', error);

      if (error.response?.status === 401) {
        // Unauthorized → redirect to login
        navigate('/login');
      } else {
        alert('Failed to join community. Please try again.');
      }
    }
  };

  // Handle post interactions
  const handleLike = (postId) => {
    if (!requireAuth(navigate, 'like', { postId })) return;
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleComment = (postId, commentText) => {
    if (!requireAuth(navigate, 'comment', { postId })) return;
    if (!commentText.trim()) return;

    const comment = {
      id: Date.now(),
      user: "You",
      text: commentText,
      avatar: "https://randomuser.me/api/portraits/men/88.jpg",
      time: "now"
    };

    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
  };

  const handleAddComment = () => {
    if (!requireAuth(navigate, 'comment', { postId: activeCommentPost })) return;
    if (!newComment.trim() || !activeCommentPost) return;

    handleComment(activeCommentPost, newComment);
    setNewComment('');
  };

  const [commentInputs, setCommentInputs] = useState({});

  const handleShare = (postId) => {
    if (!requireAuth(navigate, 'share', { postId })) return;
    setSharePostId(postId);
    setShowShareModal(true);
  };

  const handleSocialShare = (platform, postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const postUrl = `${window.location.origin}/post/${postId}`;
    const postText = `Check out this post: "${post.content.substring(0, 100)}..."`;
    const shareText = encodeURIComponent(postText);
    const shareUrl = encodeURIComponent(postUrl);

    let shareLink = '';

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${shareText}%20${shareUrl}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=Check out this post&body=${shareText}%0A%0A${shareUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${postText} ${postUrl}`);
        alert('Link copied to clipboard!');
        setShowShareModal(false);
        return;
      default:
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      setShowShareModal(false);
    }
  };

  const handleConnect = (userId) => {
    if (!requireAuth(navigate, 'connect', { userId })) return;
    setConnectedUsers(prev => {
      const newConnected = new Set(prev);
      if (newConnected.has(userId)) {
        newConnected.delete(userId);
      } else {
        newConnected.add(userId);
      }
      return newConnected;
    });
  };

  const handleJoinCommunitySuggestion = (communityId) => {
    if (!requireAuth(navigate, 'join-community', { communityId })) return;
    setJoinedCommunities(prev => {
      const newJoined = new Set(prev);
      if (newJoined.has(communityId)) {
        newJoined.delete(communityId);
      } else {
        newJoined.add(communityId);
      }
      return newJoined;
    });
  };

  return (
    <Container className="home-container">
      {/* Feed Header with Join Community Button */}
      <div className="feed-header text-center my-4">
        <h4 className="mb-2">Welcome to Your Learning Feed</h4>
        <p className="mb-3 text-muted">Discover, Learn, and Share Knowledge</p>
        
        <Button 
          variant="primary" 
          size="lg" 
          className="rounded-pill px-5 py-2 shadow-sm"
          onClick={handleJoinCommunity}
        >
          Join Community
        </Button>
      </div>

      {/* Create Post Section */}
      <Card className="post-create-card mb-4">
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
              onFocus={() => { if (!isAuthenticated()) navigate('/login', { state: { from: '/home', intent: 'create-post' } }); }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3">
              <Button variant="light" className="post-btn" onClick={() => { if (!requireAuth(navigate, 'attach-photo')) return; }}>
                <FaImage /> Photo
              </Button>
              <Button variant="light" className="post-btn" onClick={() => { if (!requireAuth(navigate, 'attach-code')) return; }}>
                <FaCode /> Code
              </Button>
              <Button variant="light" className="post-btn" onClick={() => { if (!requireAuth(navigate, 'create-poll')) return; }}>
                <FaBrain /> Poll
              </Button>
            </div>
            <Button variant="primary" className="px-4 rounded-pill" onClick={() => { if (!requireAuth(navigate, 'share-post')) return; }}>Share</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Filters */}
      <div className="post-filters mb-4 d-flex flex-wrap gap-2 justify-content-center">
        <Button variant="outline-primary" className="rounded-pill px-4" active>All Posts</Button>
        <Button variant="outline-primary" className="rounded-pill px-4">Courses</Button>
        <Button variant="outline-primary" className="rounded-pill px-4">Tips & Insights</Button>
        <Button variant="outline-primary" className="rounded-pill px-4">Achievements</Button>
      </div>

      {/* Posts Feed */}
      <div className="posts-container">
        {posts.map((post) => (
          <Card key={post.id} className={`post-card ${post.type}-post mb-4 shadow-sm`}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex">
                  <div className="position-relative">
                    <img src={post.user.image} alt={post.user.name} className="post-avatar" />
                    {post.user.verified && <span className="verified-badge">✓</span>}
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
                {post.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-1">{line || <br />}</p>
                ))}
              </div>

              {post.image && (
                <div className="post-image-container mb-3">
                  <img src={post.image} alt="Post" className="post-image rounded" />
                </div>
              )}

              <div className="post-stats d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <div className="reaction-icons me-2">
                    <span>👍</span><span>❤️</span><span>🎉</span>
                  </div>
                  <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </div>
                <div className="text-muted small">
                  <span className="me-3">{post.comments + (postComments[post.id]?.length || 0)} comments</span>
                  <span>{post.shares} shares</span>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-around">
                <Button 
                  variant="light" 
                  className={`action-btn flex-fill mx-1 ${likedPosts.has(post.id) ? 'liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <FaThumbsUp className={likedPosts.has(post.id) ? 'text-primary' : ''} /> 
                  {likedPosts.has(post.id) ? 'Liked' : 'Like'}
                </Button>
                <Button 
                  variant="light" 
                  className="action-btn flex-fill mx-1"
                  onClick={() => {
                    const input = document.getElementById(`comment-input-${post.id}`);
                    if (input) input.focus();
                  }}
                >
                  <FaComment /> Comment
                </Button>
                <Button 
                  variant="light" 
                  className="action-btn flex-fill mx-1"
                  onClick={() => handleShare(post.id)}
                >
                  <FaShare /> Share
                </Button>
              </div>

              {/* Comments Section */}
              {(postComments[post.id] && postComments[post.id].length > 0) && (
                <div className="comments-section mt-3">
                  <div className="comments-list">
                    {postComments[post.id].slice(0, 3).map((comment) => (
                      <div key={comment.id} className="comment-item d-flex mb-2">
                        <img 
                          src={comment.avatar} 
                          alt={comment.user} 
                          className="comment-avatar me-2"
                        />
                        <div className="comment-content flex-grow-1">
                          <div className="comment-bubble">
                            <strong className="comment-user">{comment.user}</strong>
                            <span className="comment-text">{comment.text}</span>
                          </div>
                          <div className="comment-actions mt-1">
                            <small className="text-muted me-2">{comment.time}</small>
                            <button className="comment-action-btn">Like</button>
                            <button className="comment-action-btn">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {postComments[post.id].length > 3 && (
                      <button 
                        className="view-more-comments"
                        onClick={() => {
                          const input = document.getElementById(`comment-input-${post.id}`);
                          if (input) input.focus();
                        }}
                      >
                        View all {postComments[post.id].length} comments
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Comment Input */}
              <div className="quick-comment mt-3 d-flex align-items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/88.jpg" 
                  alt="Your avatar" 
                  className="comment-avatar me-2"
                />
                <div className="flex-grow-1 position-relative">
                  <input
                    id={`comment-input-${post.id}`}
                    type="text"
                    className="form-control comment-input"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs(prev => ({...prev, [post.id]: e.target.value}))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(post.id, commentInputs[post.id] || '');
                        setCommentInputs(prev => ({...prev, [post.id]: ''}));
                      }
                    }}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Community Suggestions */}
      <Card className="suggestions-card mb-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">
              <FaUsers className="me-2 text-primary" />
              Suggested Communities
            </h5>
          </div>
          <div className="suggestions-list">
            {communitySuggestions.map((community) => (
              <div key={community.id} className="suggestion-item d-flex align-items-center justify-content-between p-3 border-bottom">
                <div className="d-flex align-items-center">
                  <img src={community.image} alt={community.name} className="suggestion-avatar me-3" />
                  <div>
                    <h6 className="mb-1">{community.name}</h6>
                    <p className="text-muted small mb-1">{community.members.toLocaleString()} members</p>
                    <small className="text-muted">{community.description}</small>
                  </div>
                </div>
                <Button 
                  variant={joinedCommunities.has(community.id) ? "outline-primary" : "primary"}
                  size="sm"
                  className="rounded-pill"
                  onClick={() => handleJoinCommunitySuggestion(community.id)}
                >
                  {joinedCommunities.has(community.id) ? "Joined" : "Join"}
                </Button>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* User Connection Suggestions */}
      <Card className="suggestions-card mb-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">
              <FaUserPlus className="me-2 text-success" />
              People You May Know
            </h5>
          </div>
          <div className="suggestions-list">
            {userSuggestions.map((user) => (
              <div key={user.id} className="suggestion-item d-flex align-items-center justify-content-between p-3 border-bottom">
                <div className="d-flex align-items-center">
                  <img src={user.image} alt={user.name} className="suggestion-avatar me-3" />
                  <div>
                    <h6 className="mb-1">{user.name}</h6>
                    <p className="text-muted small mb-1">{user.role} at {user.company}</p>
                    <small className="text-muted">{user.mutualConnections} mutual connections</small>
                    <div className="mt-1">
                      {user.skills.slice(0, 2).map((skill, index) => (
                        <span key={index} className="badge bg-light text-dark me-1 small">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button 
                  variant={connectedUsers.has(user.id) ? "outline-success" : "success"}
                  size="sm"
                  className="rounded-pill"
                  onClick={() => handleConnect(user.id)}
                >
                  <FaUserPlus className="me-1" />
                  {connectedUsers.has(user.id) ? "Connected" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Comment Modal */}
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered size="lg" className="comment-modal">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FaComment className="me-2 text-primary" />
            Comments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {/* Add Comment Form */}
          <div className="add-comment-form">
            <img
              src="https://randomuser.me/api/portraits/men/88.jpg"
              alt="Your avatar"
              className="comment-avatar"
            />
            <div className="flex-grow">
              <textarea
                className="form-control mb-1"
                rows="3"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowCommentModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <FaPaperPlane className="me-1" />
                  Post
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {activeCommentPost && postComments[activeCommentPost] && (
            <div className="comments-list-modal">
              {postComments[activeCommentPost].map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="d-flex">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="comment-avatar me-3"
                    />
                    <div className="comment-content flex-grow-1">
                      <div className="comment-bubble">
                        <strong className="comment-user">{comment.user}</strong>
                        <p className="comment-text mb-2">{comment.text}</p>
                        <div className="comment-actions">
                          <small className="text-muted me-3">{comment.time}</small>
                          <button className="btn btn-link btn-sm text-muted p-0 me-2">Like</button>
                          <button className="btn btn-link btn-sm text-muted p-0">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FaShare className="me-2 text-primary" />
            Share Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">Choose how you'd like to share this post</p>
          
          <div className="share-options">
            <div className="share-grid">
              <Button 
                variant="outline-primary" 
                className="share-btn d-flex flex-column align-items-center p-3"
                onClick={() => handleSocialShare('twitter', sharePostId)}
              >
                <FaTwitter size={24} className="mb-2" />
                <span>Twitter</span>
              </Button>
              
              <Button 
                variant="outline-primary" 
                className="share-btn d-flex flex-column align-items-center p-3"
                onClick={() => handleSocialShare('facebook', sharePostId)}
              >
                <FaFacebook size={24} className="mb-2" />
                <span>Facebook</span>
              </Button>
              
              <Button 
                variant="outline-primary" 
                className="share-btn d-flex flex-column align-items-center p-3"
                onClick={() => handleSocialShare('linkedin', sharePostId)}
              >
                <FaLinkedin size={24} className="mb-2" />
                <span>LinkedIn</span>
              </Button>
              
              <Button 
                variant="outline-success" 
                className="share-btn d-flex flex-column align-items-center p-3"
                onClick={() => handleSocialShare('whatsapp', sharePostId)}
              >
                <FaWhatsapp size={24} className="mb-2" />
                <span>WhatsApp</span>
              </Button>
              
              <Button 
                variant="outline-info" 
                className="share-btn d-flex flex-column align-items-center p-3"
                onClick={() => handleSocialShare('telegram', sharePostId)}
              >
                <FaTelegram size={24} className="mb-2" />
                <span>Telegram</span>
              </Button>
              
              <Button 
                variant="outline-secondary" 
                className="share-btn d-flex flex-column align-items-center p-3"
                onClick={() => handleSocialShare('email', sharePostId)}
              >
                <FaEnvelope size={24} className="mb-2" />
                <span>Email</span>
              </Button>
            </div>
            
            <hr className="my-3" />
            
            <Button 
              variant="light" 
              className="w-100 d-flex align-items-center justify-content-center"
              onClick={() => handleSocialShare('copy', sharePostId)}
            >
              <FaCopy className="me-2" />
              Copy Link
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default HomePage;