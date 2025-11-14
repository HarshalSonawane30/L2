import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import './Profile.css';

function UserProfile() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const notificationId = searchParams.get('notification');
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Demo: Simulate loading user profile
    setTimeout(() => {
      // In a real app, you would fetch user data from an API
      setUserProfile({
        name: `User ${userId}`,
        role: "Community Member",
        image: `https://randomuser.me/api/portraits/${userId % 2 ? 'men' : 'women'}/${userId}.jpg`,
        activities: notificationId ? [{
          id: notificationId,
          content: "Sample notification activity",
          date: "Just now",
          highlight: true
        }] : []
      });
      setLoading(false);
    }, 1000);
  }, [userId, notificationId]);

  if (loading) {
    return (
      <Container className="py-4">
        <div>Loading profile...</div>
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container className="py-4">
        <div>User not found</div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="mb-4 profile-header">
        <div className="profile-cover"></div>
        <Card.Body className="position-relative">
          <img
            src={userProfile.image}
            alt={`${userProfile.name}'s profile`}
            className="profile-picture"
          />
          <h4 className="mt-4">{userProfile.name}</h4>
          <p className="text-muted">{userProfile.role}</p>
        </Card.Body>
      </Card>

      {notificationId && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Notification Activity</h5>
            {userProfile.activities.map(activity => (
              <div 
                key={activity.id} 
                className={`activity-item ${activity.highlight ? 'highlighted-activity' : ''}`}
              >
                <p>{activity.content}</p>
                <small className="text-muted">{activity.date}</small>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default UserProfile;