const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: {
      values: ['Food Bank', 'Education', 'Healthcare', 'Events', 'Job Opportunities', 'Housing', 'Other'],
      message: 'Please select a valid category'
    }
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true
  },
  contactInfo: {
    type: String,
    required: [true, 'Please provide contact information'],
    trim: true
  },
  availability: {
    type: String,
    trim: true,
    default: 'Contact for availability'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);