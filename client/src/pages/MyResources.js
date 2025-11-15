import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resourceAPI } from '../utils/api';
import { useAuth } from '../context/useAuth';
import './MyResources.css';

const MyResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchMyResources();
    }
  }, [isAuthenticated, navigate]);

  const fetchMyResources = async () => {
    try {
      const response = await resourceAPI.getMyResources();
      setResources(response.data.resources);
      setLoading(false);
    } catch (err) {
      setError('Failed to load your resources');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceAPI.deleteResource(id);
        setResources(resources.filter(resource => resource._id !== id));
      } catch (err) {
        alert('Failed to delete resource');
      }
    }
  };

  if (loading) {
    return <div className="container"><p className="loading">Loading your resources...</p></div>;
  }

  return (
    <div className="my-resources-container">
      <div className="container">
        <div className="my-resources-header">
          <h1>My Resources</h1>
          <Link to="/create-resource" className="add-new-button">
            + Add New Resource
          </Link>
        </div>

        {error && <p className="error-message">{error}</p>}

        {resources.length === 0 ? (
          <div className="empty-state">
            <p>You haven't posted any resources yet.</p>
            <Link to="/create-resource" className="create-first-button">
              Create Your First Resource
            </Link>
          </div>
        ) : (
          <div className="my-resources-grid">
            {resources.map(resource => (
              <div key={resource._id} className="my-resource-card">
                <div className="resource-category">{resource.category}</div>
                <h3>{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                
                <div className="resource-info">
                  <p><strong>📍 Location:</strong> {resource.location}</p>
                  <p><strong>📞 Contact:</strong> {resource.contactInfo}</p>
                  <p><strong>🕒 Available:</strong> {resource.availability}</p>
                </div>

                <div className="resource-meta">
                  <span className="posted-date">
                    Posted: {new Date(resource.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="resource-actions">
                  <Link to={`/resource/${resource._id}`} className="view-button">
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(resource._id)} 
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyResources;