const express = require('express');
const viewController = require('../controllers/viewController');
const router = express.Router();

router.route('/').get(viewController.getIndex);
router.route('/stories').get(viewController.getAllStories);
router.route('/stories/:id').get(viewController.getSingleStory);
router.route('/about').get(viewController.getAbout);
router.route('/contact').get(viewController.getContact);
router.route('/admin/dashboard').get(viewController.getAdminHome);
router
  .route('/admin/story')
  .get(viewController.createStoryPage)
  .post(viewController.createStory);

router
  .route('/admin/story/:id')
  .get(viewController.getStoryEditPage)
  .patch(viewController.editStory)
  .delete(viewController.deleteStory);
router.route('/admin/cloudinary').get(viewController.getCloudinaryUploadPage);
module.exports = router;
