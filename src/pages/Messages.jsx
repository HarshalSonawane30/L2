import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import { 
  FaSearch, 
  FaPaperPlane, 
  FaEllipsisH, 
  FaPhone, 
  FaVideo, 
  FaDesktop,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaPhoneSlash,
  FaExpand,
  FaCompress,
  FaCircle
} from 'react-icons/fa';
import './Messages.css';
import statusManager from '../utils/statusManager';

function Messages() {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  // showCallingOverlay removed — we will use small system messages in chat instead of a full-screen overlay
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      username: "emma_wilson",
      role: "React Developer",
      lastMessage: "🚀 Just pushed the new feature. Can you review it?",
      time: "2m ago",
      unread: true,
      online: true,
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Alex Chen",
      username: "alex_chen",
      role: "UX Design Mentor",
      lastMessage: "The wireframes look amazing! Great progress on the project.",
      time: "15m ago",
      unread: true,
      online: true,
      image: "https://randomuser.me/api/portraits/men/44.jpg"
    },
    {
      id: 3,
      name: "Sarah Parker",
      username: "sarah_parker",
      role: "Python Instructor",
      lastMessage: "Here is the code sample for machine learning we discussed 📊",
      time: "1h ago",
      unread: true,
      online: false,
      lastSeen: "30m ago",
      image: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
      id: 4,
      name: "James Rodriguez",
      username: "james_rod",
      role: "Full Stack Developer",
      lastMessage: "Thanks for helping with the Docker setup! 🐳",
      time: "2h ago",
      unread: false,
      online: true,
      image: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    {
      id: 5,
      name: "Lily Zhang",
      username: "lily_zhang",
      role: "UI/UX Designer",
      lastMessage: "Shared the Figma prototype with you.",
      time: "3h ago",
      unread: false,
      online: false,
      lastSeen: "2h ago",
      image: "https://randomuser.me/api/portraits/women/89.jpg"
    },
    {
      id: 6,
      name: "David Kim",
      username: "david_kim",
      role: "Mobile Dev Expert",
      lastMessage: "Let us schedule the React Native workshop for next week 📱",
      time: "5h ago",
      unread: false,
      online: false,
      lastSeen: "4h ago",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ]);
  const [statuses, setStatuses] = useState({});
  const [mockMessages, setMockMessages] = useState({
    1: [
      { id: 1, sent: false, content: "Hey! I just pushed some changes to the feature branch 🚀", time: "10:30 AM" },
      { id: 2, sent: true, content: "Great! I will take a look at it right away. Any specific areas you want me to focus on?", time: "10:31 AM" },
      { id: 3, sent: false, content: "Yes, please check the new authentication flow and the state management implementation.", time: "10:32 AM" },
      { id: 4, sent: false, content: "I used Redux Toolkit for better performance", time: "10:32 AM" },
      { id: 5, sent: true, content: "Perfect timing! I was just working on the auth module. I will review it and get back to you in 30 mins.", time: "10:35 AM" }
    ],
    2: [
      { id: 1, sent: false, content: "The new dashboard wireframes are ready for review! 🎨", time: "9:45 AM" },
      { id: 2, sent: true, content: "Just checked them out - love the new layout! The user flow is much clearer now.", time: "9:50 AM" },
      { id: 3, sent: false, content: "Thanks! I focused on improving the navigation hierarchy", time: "9:51 AM" },
      { id: 4, sent: true, content: "It shows! The breadcrumb implementation is particularly clever.", time: "9:55 AM" }
    ]
  });

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage = {
      id: Date.now(),
      sent: true,
      content: messageInput.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    };

    setMockMessages(prev => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), newMessage]
    }));

    setConversations(prev => prev.map(conv => 
      conv.id === activeConversation.id 
        ? { ...conv, lastMessage: messageInput.trim(), time: 'Just now' }
        : conv
    ));

    setMessageInput('');
  };

  const handleMessageSubmit = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartCall = (video = false) => {
    setIsVideoCall(video);
    // Append a small system message indicating call is starting/coming
    if (activeConversation) {
      const callingMsg = {
        id: Date.now(),
        type: 'system',
        content: video ? 'Video call is coming...' : 'Call is coming...',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      };

      setMockMessages(prev => ({ ...prev, [activeConversation.id]: [...(prev[activeConversation.id] || []), callingMsg] }));
      setConversations(prev => prev.map(conv => conv.id === activeConversation.id ? { ...conv, lastMessage: callingMsg.content, time: 'Just now' } : conv));
    }

    // Simulate connecting after 3 seconds and then enter in-call UI
    setTimeout(() => {
      setIsInCall(true);
    }, 3000);
    // In a real app, you would initialize WebRTC connection here
  };

  // Helper: human readable time ago
  const timeAgo = (ts) => {
    if (!ts) return '';
    if (typeof ts === 'string') return ts;
    if (typeof ts !== 'number') return '';
    const diff = Date.now() - ts;
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const d = Math.floor(hr / 24);
    return `${d}d ago`;
  };

  useEffect(() => {
    // initialize statuses for conversations
    statusManager.initStatuses(conversations);
    setStatuses(statusManager.getStatuses());

    // demo updater: randomly toggle statuses periodically
    const ids = conversations.map(c => c.id);
    const iv = setInterval(() => {
      statusManager.randomToggle(ids);
      setStatuses(statusManager.getStatuses());
    }, 7000);

    return () => clearInterval(iv);
  }, []); // run once

  // If a route param `id` is present (from /messages/:id) open that conversation
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params && params.id) {
      const id = parseInt(params.id, 10);
      const conv = conversations.find(c => c.id === id);
      if (conv) {
        setActiveConversation(conv);
        // ensure there's a messages array ready
        setMockMessages(prev => ({ ...prev, [conv.id]: prev[conv.id] || [] }));
      } else {
        // if not found, optionally navigate to /messages
        if (navigate) navigate('/messages');
      }
    }
  }, [params && params.id, conversations]);


  const handleEndCall = () => {
    setIsInCall(false);
    setIsVideoCall(false);
    setIsScreenSharing(false);
    setIsMuted(false);
    setIsVideoOff(false);
    // In a real app, you would close WebRTC connection here
    // Append a system message to the active conversation to indicate call ended
    if (activeConversation) {
      const endedMsg = {
        id: Date.now(),
        type: 'system',
        content: 'Call ended',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      };

      setMockMessages(prev => ({
        ...prev,
        [activeConversation.id]: [...(prev[activeConversation.id] || []), endedMsg]
      }));

      // ensure conversation preview/time reflect the recent activity
      setConversations(prev => prev.map(conv =>
        conv.id === activeConversation.id ? { ...conv, lastMessage: 'Call ended', time: 'Just now' } : conv
      ));
    }
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In a real app, you would handle screen sharing through WebRTC here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real app, you would handle audio muting through WebRTC here
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // In a real app, you would handle video stream through WebRTC here
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real app, you would handle fullscreen mode here
  };


  return (
    <Container fluid className="messages-container py-4">
      <Row className="h-100">
        {/* Conversations List */}
        <Col md={4} className="conversations-list">
          <div className="p-3">
            <h5 className="mb-3">Messages</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search messages"
                className="search-messages"
              />
            </InputGroup>
            
            {conversations.map((conversation) => {
              const st = statuses[conversation.id] || {};
              const isOnline = !!st.online;
              const lastSeenStr = st.lastSeen ? timeAgo(st.lastSeen) : conversation.lastSeen;
              return (
              <Card 
                key={conversation.id} 
                className={`mb-2 conversation-card ${conversation.unread ? 'unread' : ''}`}
                onClick={() => {
                  // mark this user online for demo when opening chat
                  statusManager.setOnline(conversation.id, true);
                  setStatuses(statusManager.getStatuses());
                  setActiveConversation(conversation);
                }}
              >
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <img
                        src={conversation.image}
                        alt={conversation.name}
                        className="rounded-circle conversation-img"
                      />
                      <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0 d-flex align-items-center">
                            {conversation.name}
                            {conversation.unread && (
                              <span className="unread-badge ms-2"></span>
                            )}
                          </h6>
                          <small className="text-muted username">@{conversation.username}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )})}
          </div>
        </Col>

        {/* Chat Window */}
        <Col md={8} className="chat-window">
          <Card className="h-100">
            {/* Chat Header */}
            <Card.Header className="d-flex justify-content-between align-items-center">
              {activeConversation ? (
                <>
                  <div className="chat-profile-info">
                    <div className="position-relative">
                      <img
                        src={activeConversation.image}
                        alt={activeConversation.name}
                        className="rounded-circle chat-avatar"
                      />
                      <span className={`status-indicator ${statuses[activeConversation.id] && statuses[activeConversation.id].online ? 'online' : 'offline'}`}></span>
                    </div>
                    <div className="ms-3 profile-details">
                      <h6 className="mb-0">{activeConversation.name}</h6>
                      <div className="d-flex align-items-center">
                        <small className="text-muted text-truncate">{activeConversation.role}</small>
                        <span className="dot-separator">•</span>
                        <small className="text-muted text-truncate">
                          {statuses[activeConversation.id] && statuses[activeConversation.id].online ? 'Online' : `Last seen ${timeAgo((statuses[activeConversation.id] && statuses[activeConversation.id].lastSeen) || activeConversation.lastSeen)}`}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button 
                      variant="light" 
                      className="rounded-circle me-2 call-btn"
                      onClick={() => handleStartCall(false)}
                    >
                      <FaPhone />
                    </Button>
                    <Button 
                      variant="light" 
                      className="rounded-circle me-2 call-btn"
                      onClick={() => handleStartCall(true)}
                    >
                      <FaVideo />
                    </Button>
                    <Button variant="light" className="rounded-circle">
                      <FaEllipsisH />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="w-100 text-center text-muted">
                  <h6 className="mb-0">Select a conversation to start messaging</h6>
                </div>
              )}
            </Card.Header>

            {/* Chat Messages or Call Interface */}
            <Card.Body className={`chat-messages ${isInCall ? 'p-0' : ''}`}>
              {isInCall ? (
                <div className={`call-container ${isFullscreen ? 'fullscreen' : ''}`}>
                  {/* Call Header */}
                  <div className="call-header">
                    <div className="call-type-indicator">
                      {isVideoCall ? <FaVideo className="me-2" /> : <FaPhone className="me-2" />}
                      {isVideoCall ? 'Video Call' : 'Voice Call'} with {activeConversation?.name}
                    </div>
                    <div className="call-duration text-white">
                      {/* You can add call duration here */}
                    </div>
                  </div>

                  <div className="video-grid">
                    {/* Main Video Container */}
                    <div className="video-container main-video">
                      {isVideoCall ? (
                        <div className="video-placeholder">
                          {isScreenSharing ? (
                            <div className="screen-share-indicator">
                              <FaDesktop className="display-1 mb-3" />
                              <h5>Screen Sharing Active</h5>
                            </div>
                          ) : isVideoOff ? (
                            <div className="video-off-indicator">
                              <img
                                src={activeConversation?.image || "https://via.placeholder.com/40"}
                                alt={activeConversation?.name || "User"}
                                className="rounded-circle mb-3"
                              />
                              <h5>Camera Off</h5>
                            </div>
                          ) : (
                            <div className="remote-video-placeholder">
                              <img
                                src={activeConversation?.image || "https://via.placeholder.com/40"}
                                alt={activeConversation?.name || "User"}
                                className="rounded-circle mb-3"
                              />
                              <h5>{activeConversation?.name || "User"}</h5>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="voice-call-placeholder">
                          <img
                            src={activeConversation?.image || "https://via.placeholder.com/40"}
                            alt={activeConversation?.name || "User"}
                            className="rounded-circle mb-3 large-avatar"
                          />
                          <h5>{activeConversation?.name || "User"}</h5>
                          <p className="text-muted">Voice Call</p>
                        </div>
                      )}
                    </div>

                    {/* Self Video Container (only in video calls) */}
                    {isVideoCall && !isVideoOff && (
                      <div className="video-container self-video">
                        <div className="video-placeholder">
                          <img
                            src="https://randomuser.me/api/portraits/men/88.jpg"
                            alt="You"
                            className="rounded-circle mb-2"
                          />
                          <p className="mb-0">You</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Call Controls */}
                  <div className="call-controls">
                    <Button 
                      variant="link"
                      className={`control-btn ${isMuted ? 'red' : 'blue'}`}
                      onClick={toggleMute}
                    >
                      {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                      <span className="control-btn-label">{isMuted ? 'Unmute' : 'Mute'}</span>
                    </Button>

                    <Button 
                      variant="link"
                      className={`control-btn ${isVideoCall ? (isVideoOff ? 'yellow' : 'blue') : 'green'}`}
                      onClick={() => isVideoCall ? toggleVideo() : handleStartCall(true)}
                    >
                      {isVideoCall ? 
                        (isVideoOff ? <FaVideoSlash /> : <FaVideo />) : 
                        <FaVideo />
                      }
                      <span className="control-btn-label">
                        {isVideoCall ? 
                          (isVideoOff ? 'Camera Off' : 'Camera On') : 
                          'Switch to Video'
                        }
                      </span>
                    </Button>

                    {isVideoCall && (
                      <>
                        <Button 
                          variant="link"
                          className={`control-btn ${isScreenSharing ? 'green' : 'blue'}`}
                          onClick={toggleScreenShare}
                        >
                          <FaDesktop />
                          <span className="control-btn-label">
                            {isScreenSharing ? 'Stop Share' : 'Share'}
                          </span>
                        </Button>

                        <Button 
                          variant="link"
                          className="control-btn blue"
                          onClick={toggleFullscreen}
                        >
                          {isFullscreen ? <FaCompress /> : <FaExpand />}
                          <span className="control-btn-label">
                            {isFullscreen ? 'Exit Full' : 'Fullscreen'}
                          </span>
                        </Button>
                      </>
                    )}

                    <Button 
                      variant="link"
                      className="control-btn red"
                      onClick={handleEndCall}
                    >
                      <FaPhoneSlash />
                      <span className="control-btn-label">End</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="messages-wrapper">
                  {activeConversation && mockMessages[activeConversation.id] ? (
                    mockMessages[activeConversation.id].map((message) => {
                      if (message.type === 'system') {
                        return (
                          <div key={message.id} className={`message system`}>
                            <div className="message-content">
                              <small className="text-muted">{message.content} · {message.time}</small>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={message.id} className={`message ${message.sent ? 'sent' : 'received'} animate__animated animate__fadeIn`}>
                          {!message.sent && (
                            <div className="message-avatar">
                              <img
                                src={activeConversation.image}
                                alt={activeConversation.name}
                                className="rounded-circle"
                              />
                            </div>
                          )}
                          <div className="message-content">
                            <p>{message.content}</p>
                            <small className="text-muted">{message.time}</small>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-muted my-5">
                      <p>Start a conversation with {activeConversation?.name || 'someone'}</p>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>

            {/* Message Input */}
            <Card.Footer>
              <InputGroup>
                <Form.Control
                  placeholder="Type a message..."
                  className="message-input"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleMessageSubmit}
                  disabled={!activeConversation}
                />
                <InputGroup.Text 
                  className={`send-button ${messageInput.trim() ? 'active' : ''}`}
                  onClick={handleSendMessage}
                  style={{ cursor: messageInput.trim() ? 'pointer' : 'default' }}
                >
                  <FaPaperPlane />
                </InputGroup.Text>
              </InputGroup>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Messages;