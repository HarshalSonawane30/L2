import React, { useState } from 'react';
import { Camera, Edit2, Grid, Bookmark, User, Settings, LogOut, Heart, MessageCircle, X, Plus, Trash2, Check, MapPin, Link, Calendar, Mail, Phone, Briefcase, Save, Play } from 'lucide-react';

// UserProfile Component (Main Profile View)
const UserProfile = ({ onEditClick }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [newComment, setNewComment] = useState('');

  const userStats = {
    posts: 145,
    followers: 2847,
    following: 892
  };

  const posts = [
    { 
      id: 1, 
      type: 'image',
      image: 'https://picsum.photos/400/400?random=1', 
      likes: 234, 
      comments: [
        { id: 1, user: 'alice_dev', text: 'Amazing shot! 🔥', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 2, user: 'bob_coder', text: 'Love the composition!', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
      ]
    },
    { 
      id: 2, 
      type: 'video',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://picsum.photos/400/400?random=2',
      likes: 567, 
      comments: [
        { id: 3, user: 'charlie_js', text: 'This is beautiful! 😍', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
      ]
    },
    { 
      id: 3, 
      type: 'image',
      image: 'https://picsum.photos/400/400?random=3', 
      likes: 123, 
      comments: [
        { id: 4, user: 'diana_ui', text: 'Great work!', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 5, user: 'eve_react', text: 'Inspiring! ✨', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' }
      ]
    },
    { 
      id: 4, 
      type: 'video',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://picsum.photos/400/400?random=4',
      likes: 890, 
      comments: [
        { id: 6, user: 'frank_vue', text: 'Perfect timing!', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }
      ]
    },
    { 
      id: 5, 
      type: 'image',
      image: 'https://picsum.photos/400/400?random=5', 
      likes: 445, 
      comments: [
        { id: 7, user: 'grace_angular', text: 'So creative! 🎨', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' }
      ]
    },
    { 
      id: 6, 
      type: 'image',
      image: 'https://picsum.photos/400/400?random=6', 
      likes: 678, 
      comments: [
        { id: 8, user: 'henry_python', text: 'Love this style!', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
        { id: 9, user: 'iris_design', text: 'Beautiful colors!', avatar: 'https://randomuser.me/api/portraits/women/9.jpg' }
      ]
    },
  ];

  const savedPosts = [
    { 
      id: 7, 
      type: 'image',
      image: 'https://picsum.photos/400/400?random=7', 
      likes: 321, 
      comments: [
        { id: 10, user: 'jack_fullstack', text: 'Saved for inspiration!', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' }
      ]
    },
    { 
      id: 8, 
      type: 'image',
      image: 'https://picsum.photos/400/400?random=8', 
      likes: 456, 
      comments: [
        { id: 11, user: 'kate_mobile', text: 'Great perspective!', avatar: 'https://randomuser.me/api/portraits/women/11.jpg' }
      ]
    },
    { 
      id: 9, 
      type: 'video',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://picsum.photos/400/400?random=9',
      likes: 234, 
      comments: [
        { id: 12, user: 'leo_backend', text: 'Nice work!', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' }
      ]
    },
  ];

  const handleImageClick = (post) => {
    setSelectedImage(post);
    setShowImageModal(true);
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedImage) {
      const comment = {
        id: Date.now(),
        user: 'current_user', // In real app, this would be the logged-in user
        text: newComment.trim(),
        avatar: 'https://randomuser.me/api/portraits/men/88.jpg'
      };
      
      // Update the selected image's comments
      setSelectedImage(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
      
      setNewComment('');
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            <img 
              src="https://randomuser.me/api/portraits/men/88.jpg" 
              alt="Profile"
              className="profile-avatar-large"
            />
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-top-row">
            <h2 className="profile-username">john_developer</h2>
            <button className="btn-profile-edit" onClick={onEditClick}>
              <Edit2 size={16} />
              Edit Profile
            </button>
            <button className="btn-profile-settings">
              <Settings size={20} />
            </button>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userStats.posts}</span>
              <span className="stat-label">posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.followers}</span>
              <span className="stat-label">followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.following}</span>
              <span className="stat-label">following</span>
            </div>
          </div>

          <div className="profile-bio">
            <h3 className="profile-fullname">John Developer</h3>
            <p className="bio-text">
              🚀 Full Stack Developer | React & Node.js<br/>
              💻 Building awesome web applications<br/>
              📍 San Francisco, CA<br/>
              🔗 <a href="#" className="bio-link">www.johndev.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={18} />
          <span>POSTS</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={18} />
          <span>SAVED</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'tagged' ? 'active' : ''}`}
          onClick={() => setActiveTab('tagged')}
        >
          <User size={18} />
          <span>TAGGED</span>
        </button>
      </div>

      <div className="profile-grid">
        {(activeTab === 'posts' ? posts : activeTab === 'saved' ? savedPosts : []).map((post) => (
          <div 
            key={post.id} 
            className="grid-item"
            onClick={() => handleImageClick(post)}
          >
            <img src={post.type === 'video' ? post.thumbnail : post.image} alt={`Post ${post.id}`} />
            {post.type === 'video' && (
              <div className="video-indicator">
                <Play size={24} fill="white" />
              </div>
            )}
            <div className="grid-overlay">
              <div className="overlay-stats">
                <span><Heart size={20} fill="white" /> {post.likes}</span>
                <span><MessageCircle size={20} fill="white" /> {post.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showImageModal && selectedImage && (
        <div className="image-modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="image-modal-content instagram-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowImageModal(false)}>
              <X size={24} />
            </button>
            
            {/* Left side - Image/Video */}
            <div className="modal-image-section">
              {selectedImage.type === 'video' ? (
                <video 
                  src={selectedImage.video} 
                  controls 
                  className="modal-main-image"
                  poster={selectedImage.thumbnail}
                />
              ) : (
                <img src={selectedImage.image} alt="Selected post" className="modal-main-image" />
              )}
            </div>
            
            {/* Right side - Info and comments */}
            <div className="modal-info-section">
              {/* Header with user info */}
              <div className="modal-header">
                <div className="modal-user-info">
                  <img 
                    src="https://randomuser.me/api/portraits/men/88.jpg" 
                    alt="User avatar" 
                    className="modal-user-avatar"
                  />
                  <div className="modal-user-details">
                    <span className="modal-username">john_developer</span>
                    <span className="modal-location">San Francisco, CA</span>
                  </div>
                </div>
                <button className="modal-options">
                  <Settings size={20} />
                </button>
              </div>
              
              {/* Comments section */}
              <div className="modal-comments">
                {/* Post caption */}
                <div className="modal-caption">
                  <img 
                    src="https://randomuser.me/api/portraits/men/88.jpg" 
                    alt="User avatar" 
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <span className="comment-username">john_developer</span>
                    <span className="comment-text">Amazing view from the office today! 🚀 #coding #developerlife</span>
                  </div>
                </div>
                
                {/* Comments */}
                {selectedImage.comments.map(comment => (
                  <div key={comment.id} className="modal-comment">
                    <img 
                      src={comment.avatar} 
                      alt={`${comment.user} avatar`} 
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <span className="comment-username">{comment.user}</span>
                      <span className="comment-text">{comment.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Actions */}
              <div className="modal-actions">
                <div className="modal-action-buttons">
                  <button 
                    className={`action-button ${likedPosts.has(selectedImage.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(selectedImage.id)}
                  >
                    <Heart size={24} fill={likedPosts.has(selectedImage.id) ? 'red' : 'none'} />
                  </button>
                  <button className="action-button">
                    <MessageCircle size={24} />
                  </button>
                  <button className="action-button">
                    <Plus size={24} />
                  </button>
                </div>
                <button className="action-button bookmark-btn">
                  <Bookmark size={24} />
                </button>
              </div>
              
              {/* Likes count */}
              <div className="modal-likes">
                <span className="likes-count">{selectedImage.likes + (likedPosts.has(selectedImage.id) ? 1 : 0)} likes</span>
              </div>
              
              {/* Timestamp */}
              <div className="modal-timestamp">
                2 HOURS AGO
              </div>
              
              {/* Add comment */}
              <div className="modal-add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="comment-input"
                />
                <button 
                  className={`post-comment-btn ${newComment.trim() ? 'active' : ''}`}
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ProfileEdit Component
const ProfileEdit = ({ onSaveClick, onCancelClick }) => {
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/88.jpg');
  const [formData, setFormData] = useState({
    username: 'john_developer',
    fullname: 'John Developer',
    bio: '🚀 Full Stack Developer | React & Node.js\n💻 Building awesome web applications\n📍 San Francisco, CA\n🔗 www.johndev.com',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    gender: 'male'
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving profile:', formData);
    onSaveClick();
  };

  return (
    <div className="profile-edit-container">
      <div className="edit-header">
        <h2>Edit Profile</h2>
        <button className="btn-close-edit" onClick={onCancelClick}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="edit-avatar-section">
          <div className="edit-avatar-wrapper">
            <img src={profileImage} alt="Profile" className="edit-avatar" />
            <label htmlFor="avatar-upload" className="avatar-upload-overlay">
              <Camera size={24} />
              <span>Change Photo</span>
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div className="avatar-actions">
            <label htmlFor="avatar-upload" className="btn-change-photo">
              Change Profile Photo
            </label>
            <button type="button" className="btn-remove-photo" onClick={() => setProfileImage('https://via.placeholder.com/150')}>
              Remove Current Photo
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            placeholder="Full Name"
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            rows="5"
          />
          <small className="char-count">{formData.bio.length} / 150</small>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email address"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            <Check size={18} />
            Save Changes
          </button>
          <button type="button" className="btn-cancel" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// ProfileView Component (Public View)
const ProfileView = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const posts = [
    { id: 1, image: 'https://picsum.photos/400/400?random=11', likes: 432, comments: 67 },
    { id: 2, image: 'https://picsum.photos/400/400?random=12', likes: 789, comments: 123 },
    { id: 3, image: 'https://picsum.photos/400/400?random=13', likes: 234, comments: 45 },
    { id: 4, image: 'https://picsum.photos/400/400?random=14', likes: 567, comments: 89 },
  ];

  return (
    <div className="profile-view-container">
      <div className="view-header">
        <div className="view-avatar-section">
          <div className="view-avatar-wrapper">
            <img 
              src="https://randomuser.me/api/portraits/women/32.jpg" 
              alt="Profile"
              className="view-avatar"
            />
          </div>
        </div>

        <div className="view-info-section">
          <div className="view-top-row">
            <h2 className="view-username">emma_wilson</h2>
            <button 
              className={`btn-follow ${isFollowing ? 'following' : ''}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="btn-message">
              Message
            </button>
            <button className="btn-more">
              <Settings size={20} />
            </button>
          </div>

          <div className="view-stats">
            <div className="stat-item">
              <span className="stat-number">89</span>
              <span className="stat-label">posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1.2K</span>
              <span className="stat-label">followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">456</span>
              <span className="stat-label">following</span>
            </div>
          </div>

          <div className="view-bio">
            <h3 className="view-fullname">Emma Wilson</h3>
            <p className="bio-text">
              🎨 UX/UI Designer<br/>
              ✨ Creating beautiful digital experiences<br/>
              📍 New York, NY
            </p>
          </div>
        </div>
      </div>

      <div className="view-tabs">
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={18} />
          <span>POSTS</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'tagged' ? 'active' : ''}`}
          onClick={() => setActiveTab('tagged')}
        >
          <User size={18} />
          <span>TAGGED</span>
        </button>
      </div>

      <div className="view-grid">
        {posts.map((post) => (
          <div key={post.id} className="grid-item">
            <img src={post.image} alt={`Post ${post.id}`} />
            <div className="grid-overlay">
              <div className="overlay-stats">
                <span><Heart size={20} fill="white" /> {post.likes}</span>
                <span><MessageCircle size={20} fill="white" /> {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('profile');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* UserProfile Styles */
        .user-profile-container {
          max-width: 935px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .profile-header {
          display: flex;
          margin-bottom: 44px;
          gap: 30px;
        }

        .profile-avatar-section {
          flex: 0 0 auto;
          margin-right: 30px;
        }

        .profile-avatar-wrapper {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #dbdbdb;
        }

        .profile-avatar-large {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-info-section {
          flex: 1;
          min-width: 0;
        }

        .profile-top-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .profile-username {
          font-size: 28px;
          font-weight: 300;
          margin: 0;
        }

        .btn-profile-edit {
          padding: 7px 16px;
          background: transparent;
          border: 1px solid #dbdbdb;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-profile-edit:hover {
          background: #fafafa;
        }

        .btn-profile-settings {
          padding: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .profile-stats {
          display: flex;
          gap: 40px;
          margin-bottom: 20px;
        }

        .stat-item {
          display: flex;
          gap: 5px;
          font-size: 16px;
        }

        .stat-number {
          font-weight: 600;
        }

        .stat-label {
          color: #262626;
        }

        .profile-bio {
          font-size: 16px;
          line-height: 1.5;
        }

        .profile-fullname {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 8px;
        }

        .bio-text {
          margin: 0;
          white-space: pre-line;
          color: #262626;
        }

        .bio-link {
          color: #00376b;
          text-decoration: none;
          font-weight: 600;
        }

        .profile-tabs {
          display: flex;
          border-top: 1px solid #dbdbdb;
          justify-content: center;
          gap: 60px;
        }

        .tab-button {
          padding: 15px 0;
          background: none;
          border: none;
          border-top: 1px solid transparent;
          margin-top: -1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #8e8e8e;
          transition: all 0.2s;
        }

        .tab-button.active {
          border-top-color: #262626;
          color: #262626;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 28px;
        }

        .grid-item {
          position: relative;
          aspect-ratio: 1;
          cursor: pointer;
          overflow: hidden;
        }

        .grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .grid-item:hover img {
          transform: scale(1.05);
        }

        .video-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          padding: 12px;
          z-index: 2;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .grid-item:hover .grid-overlay {
          opacity: 1;
        }

        .overlay-stats {
          display: flex;
          gap: 30px;
          color: white;
          font-weight: 600;
        }

        .overlay-stats span {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .image-modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }

        .image-modal-content img {
          width: 100%;
          height: auto;
          display: block;
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .modal-info {
          padding: 20px;
        }

        .modal-stats {
          display: flex;
          gap: 20px;
          font-weight: 600;
        }

        .modal-stats span {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ProfileEdit Styles */
        .profile-edit-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 30px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .edit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #dbdbdb;
          margin-bottom: 30px;
        }

        .edit-header h2 {
          font-size: 24px;
          font-weight: 600;
        }

        .btn-close-edit {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .edit-avatar-section {
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 20px;
          background: #fafafa;
          border-radius: 8px;
        }

        .edit-avatar-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
        }

        .edit-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-upload-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          opacity: 0;
          transition: opacity 0.3s;
          cursor: pointer;
          color: white;
          font-size: 12px;
        }

        .edit-avatar-wrapper:hover .avatar-upload-overlay {
          opacity: 1;
        }

        .avatar-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-change-photo {
          color: #0095f6;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-remove-photo {
          background: none;
          border: none;
          color: #ed4956;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          text-align: left;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          font-size: 14px;
          color: #262626;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 10px 12px;
          border: 1px solid #dbdbdb;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #0095f6;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .char-count {
          font-size: 12px;
          color: #8e8e8e;
          text-align: right;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .btn-save {
          flex: 1;
          padding: 12px;
          background: #0095f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .btn-save:hover {
          background: #0084e0;
        }

        .btn-cancel {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: 1px solid #dbdbdb;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-cancel:hover {
          background: #fafafa;
        }

        /* ProfileView Styles */
        .profile-view-container {
          max-width: 935px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .view-header {
          display: flex;
          margin-bottom: 44px;
          gap: 30px;
        }

        .view-avatar-section {
          flex: 0 0 auto;
          margin-right: 30px;
        }

        .view-avatar-wrapper {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #dbdbdb;
        }

        .view-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .view-info-section {
          flex: 1;
          min-width: 0;
        }

        .view-top-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .view-username {
          font-size: 28px;
          font-weight: 300;
          margin: 0;
        }

        .btn-follow {
          padding: 8px 24px;
          background: #0095f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-follow:hover {
          background: #0084e0;
        }

        .btn-follow.following {
          background: transparent;
          border: 1px solid #dbdbdb;
          color: #262626;
        }

        .btn-follow.following:hover {
          background: #fafafa;
        }

        .btn-message {
          padding: 8px 24px;
          background: transparent;
          border: 1px solid #dbdbdb;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-message:hover {
          background: #fafafa;
        }

        .btn-more {
          padding: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .view-stats {
          display: flex;
          gap: 40px;
          margin-bottom: 20px;
        }

        .view-bio {
          font-size: 16px;
          line-height: 1.5;
        }

        .view-fullname {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 8px;
        }

        .view-tabs {
          display: flex;
          border-top: 1px solid #dbdbdb;
          justify-content: center;
          gap: 60px;
        }

        .view-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 28px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-header,
          .view-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .profile-avatar-section,
          .view-avatar-section {
            margin-right: 0;
          }

          .profile-top-row,
          .view-top-row {
            flex-wrap: wrap;
            justify-content: center;
          }

          .profile-stats,
          .view-stats {
            justify-content: center;
          }

          .profile-grid,
          .view-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .edit-avatar-section {
            flex-direction: column;
            text-align: center;
          }

          .form-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .profile-grid,
          .view-grid {
            grid-template-columns: 1fr;
          }

          .profile-avatar-wrapper,
          .view-avatar-wrapper {
            width: 100px;
            height: 100px;
          }

          .profile-username,
          .view-username {
            font-size: 22px;
          }
        }

        /* Instagram-style Modal */
        .instagram-modal {
          display: flex;
          max-width: 935px;
          max-height: 600px;
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .modal-image-section {
          flex: 1;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-main-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .modal-info-section {
          width: 335px;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid #efefef;
        }

        .modal-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .modal-user-details {
          display: flex;
          flex-direction: column;
        }

        .modal-username {
          font-weight: 600;
          font-size: 14px;
        }

        .modal-location {
          font-size: 12px;
          color: #8e8e8e;
        }

        .modal-options {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .modal-comments {
          flex: 1;
          padding: 0;
          overflow-y: auto;
        }

        .modal-caption,
        .modal-comment {
          display: flex;
          padding: 12px 16px;
          gap: 12px;
        }

        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .comment-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .comment-username {
          font-weight: 600;
          font-size: 14px;
        }

        .comment-text {
          font-size: 14px;
          line-height: 1.4;
        }

        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 16px;
          border-top: 1px solid #efefef;
        }

        .modal-action-buttons {
          display: flex;
          gap: 16px;
        }

        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-button.liked svg {
          color: red;
        }

        .bookmark-btn {
          margin-left: auto;
        }

        .modal-likes {
          padding: 0 16px;
          font-weight: 600;
          font-size: 14px;
        }

        .likes-count {
          cursor: pointer;
        }

        .modal-timestamp {
          padding: 6px 16px;
          font-size: 10px;
          color: #8e8e8e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modal-add-comment {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-top: 1px solid #efefef;
          gap: 12px;
        }

        .comment-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          background: transparent;
        }

        .comment-input::placeholder {
          color: #8e8e8e;
        }

        .post-comment-btn {
          background: none;
          border: none;
          color: #0095f6;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .post-comment-btn.active {
          opacity: 1;
        }

        .post-comment-btn:not(.active) {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .instagram-modal {
            flex-direction: column;
            max-height: 100vh;
          }

          .modal-info-section {
            width: 100%;
            max-height: 300px;
          }

          .modal-image-section {
            max-height: 400px;
          }
        }
      `}</style>

      <div style={{ padding: '20px', textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #dbdbdb' }}>
        <button onClick={() => setCurrentView('profile')} style={{ margin: '0 10px', padding: '10px 20px', background: currentView === 'profile' ? '#0095f6' : '#fff', color: currentView === 'profile' ? '#fff' : '#000', border: '1px solid #dbdbdb', borderRadius: '8px', cursor: 'pointer' }}>
          My Profile
        </button>
        <button onClick={() => setCurrentView('view')} style={{ margin: '0 10px', padding: '10px 20px', background: currentView === 'view' ? '#0095f6' : '#fff', color: currentView === 'view' ? '#fff' : '#000', border: '1px solid #dbdbdb', borderRadius: '8px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>

      {currentView === 'profile' && <UserProfile onEditClick={() => setCurrentView('edit')} />}
      {currentView === 'edit' && <ProfileEdit onSaveClick={() => setCurrentView('profile')} onCancelClick={() => setCurrentView('profile')} />}
      {currentView === 'view' && <ProfileView />}
    </div>
  );
};

export default App;