import React, { useState } from 'react';
import { FaCamera, FaEdit, FaTrash, FaTimes, FaCheck, FaMapMarker, FaLink, FaCalendar, FaEnvelope, FaPhone, FaBriefcase, FaSave } from 'react-icons/fa';
import './pages/Profile.css';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    username: '@alexjohnson',
    bio: 'Full Stack Developer | UI/UX Enthusiast | Coffee Lover ☕\nBuilding amazing digital experiences.',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    occupation: 'Senior Developer at TechCorp',
    joinDate: 'January 2020',
    followers: 2847,
    following: 892,
    posts: 156
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempBio, setTempBio] = useState(profileData.bio);
  const [tempProfile, setTempProfile] = useState({ ...profileData });
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop');
  const [posts, setPosts] = useState([
    { id: 1, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop', likes: 234, comments: 12 },
    { id: 2, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=400&fit=crop', likes: 189, comments: 8 },
    { id: 3, image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop', likes: 312, comments: 24 },
    { id: 4, image: 'https://images.unsplash.com/photo-1488590040179-16e718de0119?w=400&h=400&fit=crop', likes: 276, comments: 15 },
    { id: 5, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop', likes: 198, comments: 9 },
    { id: 6, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop', likes: 421, comments: 31 }
  ]);
  const [activeTab, setActiveTab] = useState('posts');

  const handleImageUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result);
        } else if (type === 'cover') {
          setCoverImage(reader.result);
        } else if (type === 'post') {
          const newPost = {
            id: Date.now(),
            image: reader.result,
            likes: 0,
            comments: 0
          };
          setPosts([newPost, ...posts]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const saveBio = () => {
    setProfileData({ ...profileData, bio: tempBio });
    setIsEditingBio(false);
  };

  const saveProfile = () => {
    setProfileData({ ...tempProfile });
    setIsEditingProfile(false);
  };

  const cancelEdit = () => {
    setTempBio(profileData.bio);
    setIsEditingBio(false);
    setTempProfile({ ...profileData });
    setIsEditingProfile(false);
  };

  return (
    <div className="profile-page">
      {/* Cover Image */}
      <div className="cover-container">
        <img src={coverImage} alt="Cover" className="cover-image" />
        <div className="cover-overlay">
          <button
            onClick={() => document.getElementById('cover-upload').click()}
            className="cover-change-btn"
          >
            <FaCamera size={20} />
            Change Cover
          </button>
          <input
            type="file"
            accept="image/*"
            className="file-input-hidden"
            id="cover-upload"
            onChange={(e) => handleImageUpload('cover', e)}
          />
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-content">
        <div className="profile-header-section">
          <div className="profile-header-wrapper">
            {/* Profile Picture */}
            <div className="profile-image-container">
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
              />
              <button
                onClick={() => document.getElementById('profile-upload').click()}
                className="profile-camera-btn"
              >
                <FaCamera size={20} />
              </button>
              <input
                type="file"
                accept="image/*"
                className="file-input-hidden"
                id="profile-upload"
                onChange={(e) => handleImageUpload('profile', e)}
              />
            </div>

            {/* Profile Info */}
            <div className="profile-info-section">
              <div className="profile-info-card">
                <div className="profile-header-top">
                  <div>
                    <h1 className="profile-name">{profileData.name}</h1>
                    <p className="profile-username">{profileData.username}</p>
                  </div>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="edit-profile-btn"
                  >
                    <FaEdit size={18} />
                    Edit Profile
                  </button>
                </div>

                {/* Stats */}
                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-value">{profileData.posts}</div>
                    <div className="stat-label">Posts</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{profileData.followers.toLocaleString()}</div>
                    <div className="stat-label">Followers</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{profileData.following}</div>
                    <div className="stat-label">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bio-section">
          <div className="bio-header">
            <h2 className="section-title">About</h2>
            {!isEditingBio && (
              <button
                onClick={() => {
                  setTempBio(profileData.bio);
                  setIsEditingBio(true);
                }}
                className="edit-bio-btn"
              >
                <Edit2 size={18} />
                Edit
              </button>
            )}
          </div>
          {isEditingBio ? (
            <div>
              <textarea
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                className="bio-textarea"
                placeholder="Write your bio..."
              />
              <div className="bio-actions">
                <button onClick={saveBio} className="btn-save">
                  <FaCheck size={18} />
                  Save
                </button>
                <button onClick={cancelEdit} className="btn-cancel">
                  <FaTimes size={18} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="bio-text">{profileData.bio}</p>
          )}

          <div className="contact-grid">
            <div className="contact-item">
              <FaMapMarker size={20} className="contact-icon" />
              <span>{profileData.location}</span>
            </div>
            <div className="contact-item">
              <FaLink size={20} className="contact-icon" />
              <a href={`https://${profileData.website}`} className="contact-link">
                {profileData.website}
              </a>
            </div>
            <div className="contact-item">
              <FaEnvelope size={20} className="contact-icon" />
              <span>{profileData.email}</span>
            </div>
            <div className="contact-item">
              <FaPhone size={20} className="contact-icon" />
              <span>{profileData.phone}</span>
            </div>
            <div className="contact-item">
              <FaBriefcase size={20} className="contact-icon" />
              <span>{profileData.occupation}</span>
            </div>
            <div className="contact-item">
              <FaCalendar size={20} className="contact-icon" />
              <span>Joined {profileData.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-wrapper">
            <button
              onClick={() => setActiveTab('posts')}
              className={`tab-button ${activeTab === 'posts' ? 'tab-active' : ''}`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`tab-button ${activeTab === 'about' ? 'tab-active' : ''}`}
            >
              About
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        {activeTab === 'posts' && (
          <div className="posts-section">
            <div className="posts-header">
              <h2 className="section-title">My Posts</h2>
              <button
                onClick={() => document.getElementById('post-upload').click()}
                className="add-post-btn"
              >
                <Camera size={20} />
                Add Post
              </button>
              <input
                type="file"
                accept="image/*"
                className="file-input-hidden"
                id="post-upload"
                onChange={(e) => handleImageUpload('post', e)}
              />
            </div>

            <div className="posts-grid">
              {posts.map((post) => (
                <div key={post.id} className="post-item">
                  <img src={post.image} alt="Post" className="post-image" />
                  <div className="post-overlay">
                    <div className="post-stats">
                      <span className="post-stat">❤️ {post.likes}</span>
                      <span className="post-stat">💬 {post.comments}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="delete-post-btn"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-section">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <div className="about-block">
                <h3 className="about-subtitle">Bio</h3>
                <p className="about-text">{profileData.bio}</p>
              </div>
              <div className="about-block">
                <h3 className="about-subtitle">Contact Information</h3>
                <div className="about-list">
                  <p>📧 {profileData.email}</p>
                  <p>📱 {profileData.phone}</p>
                  <p>🌐 {profileData.website}</p>
                </div>
              </div>
              <div className="about-block">
                <h3 className="about-subtitle">Location & Work</h3>
                <div className="about-list">
                  <p>📍 {profileData.location}</p>
                  <p>💼 {profileData.occupation}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Edit Profile</h2>
                <button onClick={cancelEdit} className="modal-close-btn">
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    value={tempProfile.username}
                    onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Website</label>
                  <input
                    type="text"
                    value={tempProfile.website}
                    onChange={(e) => setTempProfile({ ...tempProfile, website: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    value={tempProfile.occupation}
                    onChange={(e) => setTempProfile({ ...tempProfile, occupation: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button onClick={saveProfile} className="btn-save-modal">
                  <FaSave size={20} />
                  Save Changes
                </button>
                <button onClick={cancelEdit} className="btn-cancel-modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}