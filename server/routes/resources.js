const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
  getMyResources
} = require('../controllers/resourceController');

// Public routes
router.get('/', getAllResources);
router.get('/:id', getResourceById);

// Protected routes (require authentication)
router.post('/', auth, createResource);
router.put('/:id', auth, updateResource);
router.delete('/:id', auth, deleteResource);
router.get('/user/my-resources', auth, getMyResources);

module.exports = router;