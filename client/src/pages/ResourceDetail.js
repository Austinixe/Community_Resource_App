import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resourceAPI } from '../utils/api';
import './ResourceDetail.css';

const ResourceDetail = () => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await resourceAPI.getResourceById(id);
        setResource(response.data.resource);
        setLoading(false);
      } catch (err) {
        setError('Failed to load resource');
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (loading) {
    return <div className="container"><p className="loading">Loading...</p></div>;
  }

  if (error || !resource) {
    return (
      <div className="container">
        <p className="error-message">{error || 'Resource not found'}</p>
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="resource-detail-container">
      <div className="container">
        <Link to="/" className="back-button">← Back to All Resources</Link>

        <div className="resource-detail-card">
          <div className="resource-header">
            <span className="resource-category-badge">{resource.category}</span>
            <h1>{resource.title}</h1>
          </div>

          <div className="resource-content">
            <div className="detail-section">
              <h3>📝 Description</h3>
              <p>{resource.description}</p>
            </div>

            <div className="detail-section">
              <h3>📍 Location</h3>
              <p>{resource.location}</p>
            </div>

            <div className="detail-section">
              <h3>📞 Contact Information</h3>
              <p>{resource.contactInfo}</p>
            </div>

            <div className="detail-section">
              <h3>🕒 Availability</h3>
              <p>{resource.availability}</p>
            </div>

            <div className="detail-section">
              <h3>👤 Posted By</h3>
              <p>{resource.postedBy?.name} ({resource.postedBy?.email})</p>
            </div>

            <div className="detail-section">
              <h3>📅 Posted On</h3>
              <p>{new Date(resource.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;