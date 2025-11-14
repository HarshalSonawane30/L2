import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FaImage, FaLock, FaGlobe, FaUsers, FaUserFriends } from 'react-icons/fa';
import './CreateCommunity.css';

const CreateCommunity = () => {
  const [formData, setFormData] = useState({
    type: 'group', // 'group' or 'community'
    name: '',
    description: '',
    privacy: 'public',
    coverImage: null,
    rules: [''],
    tags: '',
  });

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coverImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement group/community creation
    console.log('Creating:', formData);
  };

  const addRule = () => {
    setFormData({
      ...formData,
      rules: [...formData.rules, '']
    });
  };

  const updateRule = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData({
      ...formData,
      rules: newRules
    });
  };

  const removeRule = (index) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index)
    });
  };

  return (
    <Container className="create-community-container py-4">
      <Card className="create-community-card">
        <Card.Body>
          <h2 className="text-center mb-4">
            Create a {formData.type === 'group' ? 'Group' : 'Community'}
          </h2>

          <Form onSubmit={handleSubmit}>
            <div className="type-selector mb-4">
              <Button
                variant={formData.type === 'group' ? 'primary' : 'light'}
                className="me-2 type-btn"
                onClick={() => setFormData({ ...formData, type: 'group' })}
              >
                <FaUserFriends className="me-2" />
                Group
              </Button>
              <Button
                variant={formData.type === 'community' ? 'primary' : 'light'}
                className="type-btn"
                onClick={() => setFormData({ ...formData, type: 'community' })}
              >
                <FaUsers className="me-2" />
                Community
              </Button>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your group/community"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Privacy Setting</Form.Label>
              <div className="privacy-options">
                <Card 
                  className={`privacy-option ${formData.privacy === 'public' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, privacy: 'public' })}
                >
                  <Card.Body>
                    <FaGlobe className="privacy-icon" />
                    <h5>Public</h5>
                    <p className="mb-0">Anyone can see and join</p>
                  </Card.Body>
                </Card>
                <Card 
                  className={`privacy-option ${formData.privacy === 'private' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, privacy: 'private' })}
                >
                  <Card.Body>
                    <FaLock className="privacy-icon" />
                    <h5>Private</h5>
                    <p className="mb-0">Requires approval to join</p>
                  </Card.Body>
                </Card>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Cover Image</Form.Label>
              <div className="cover-image-upload">
                {preview ? (
                  <div className="image-preview">
                    <img src={preview} alt="Preview" />
                    <Button 
                      variant="link" 
                      className="remove-image"
                      onClick={() => {
                        setPreview(null);
                        setFormData({ ...formData, coverImage: null });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FaImage className="upload-icon" />
                    <p>Click to upload cover image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                  </div>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Rules & Guidelines</Form.Label>
              {formData.rules.map((rule, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={`Rule ${index + 1}`}
                      value={rule}
                      onChange={(e) => updateRule(index, e.target.value)}
                    />
                  </Col>
                  {formData.rules.length > 1 && (
                    <Col xs="auto">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeRule(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  )}
                </Row>
              ))}
              <Button 
                variant="outline-primary" 
                size="sm" 
                onClick={addRule}
                className="mt-2"
              >
                Add Rule
              </Button>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add tags (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Form.Text className="text-muted">
                Example: learning, technology, programming
              </Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" size="lg" type="submit">
                Create {formData.type === 'group' ? 'Group' : 'Community'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateCommunity;