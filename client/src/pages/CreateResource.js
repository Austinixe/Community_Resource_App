import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI } from '../utils/api';
import { useAuth } from '../context/useAuth';
import './CreateResource.css';

const CreateResource = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Education',
    location: '',
    contactInfo: '',
    availability: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const categories = ['Food Bank', 'Education', 'Healthcare', 'Events', 'Job Opportunities', 'Housing', 'Other'];

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resourceAPI.createResource(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create resource');
      setLoading(false);
    }
  };

  return (
    <div className="create-resource-container">
      <div className="container">
        <div className="create-resource-card">
          <h2>Add a New Resource</h2>
          <p className="subtitle">Share a resource to help your community</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="resource-form">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength="100"
                placeholder="e.g., Free Coding Bootcamp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength="500"
                rows="4"
                placeholder="Describe the resource in detail..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Downtown Community Center, 123 Main St"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactInfo">Contact Information *</label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                required
                placeholder="e.g., phone number, email, or website"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability</label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g., Monday-Friday 9am-5pm"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/')} className="cancel-button">
                Cancel
              </button>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Resource'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateResource;