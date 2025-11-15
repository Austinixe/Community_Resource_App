const Resource = require('../models/Resource');

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Private (requires authentication)
exports.createResource = async (req, res) => {
  try {
    const { title, description, category, location, contactInfo, availability } = req.body;

    // Create resource with user ID from auth middleware
    const resource = await Resource.create({
      title,
      description,
      category,
      location,
      contactInfo,
      availability,
      postedBy: req.userId // From auth middleware
    });

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      resource
    });

  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating resource',
      error: error.message
    });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate('postedBy', 'name email') // Get user info
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: resources.length,
      resources
    });

  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching resources',
      error: error.message
    });
  }
};

// @desc    Get single resource by ID
// @route   GET /api/resources/:id
// @access  Public
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('postedBy', 'name email');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.status(200).json({
      success: true,
      resource
    });

  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching resource',
      error: error.message
    });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private (only resource owner)
exports.updateResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if user is the owner
    if (resource.postedBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resource'
      });
    }

    // Update resource
    resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Resource updated successfully',
      resource
    });

  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating resource',
      error: error.message
    });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private (only resource owner)
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if user is the owner
    if (resource.postedBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resource'
      });
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Resource deleted successfully'
    });

  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting resource',
      error: error.message
    });
  }
};

// @desc    Get resources by user (My Resources)
// @route   GET /api/resources/my-resources
// @access  Private
exports.getMyResources = async (req, res) => {
  try {
    const resources = await Resource.find({ postedBy: req.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      resources
    });

  } catch (error) {
    console.error('Get my resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your resources',
      error: error.message
    });
  }
};