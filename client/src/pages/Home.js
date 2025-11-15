import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resourceAPI } from '../utils/api';
import './Home.css';

const Home = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food Bank', 'Education', 'Healthcare', 'Events', 'Job Opportunities', 'Housing', 'Other'];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await resourceAPI.getAllResources();
      setResources(response.data.resources);
      setLoading(false);
    } catch (err) {
      setError('Failed to load resources');
      setLoading(false);
    }
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="container"><p className="loading">Loading resources...</p></div>;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Community Resource Board</h1>
        <p>Discover and share resources in your community</p>
      </div>

      <div className="container">
        {/* Search and Filter */}
        <div className="search-filter-section">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <p className="no-resources">No resources found. Be the first to add one!</p>
        ) : (
          <div className="resources-grid">
            {filteredResources.map(resource => (
              <div key={resource._id} className="resource-card">
                <div className="resource-category">{resource.category}</div>
                <h3>{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-info">
                  <p><strong>📍 Location:</strong> {resource.location}</p>
                  <p><strong>📞 Contact:</strong> {resource.contactInfo}</p>
                  <p><strong>🕒 Available:</strong> {resource.availability}</p>
                </div>
                <div className="resource-footer">
                  <span className="posted-by">By: {resource.postedBy?.name}</span>
                  <Link to={`/resource/${resource._id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;