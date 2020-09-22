const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').get(viewController.getIndex);
router.route('/stories').get(viewController.getAllStories);
router.route('/stories/:id').get(viewController.getSingleStory);
router.route('/about').get(viewController.getAbout);
router.route('/contact').get(viewController.getContact);
router.route('/register').post(authController.register);
router
  .route('/admin')
  .get(viewController.getLoginPage)
  .post(authController.login);

router
  .route('/admin/dashboard')
  .get(authController.ensureAuthenticated, viewController.getAdminHome);
router
  .route('/admin/story')
  .get(authController.ensureAuthenticated, viewController.createStoryPage)
  .post(authController.ensureAuthenticated, viewController.createStory);

router
  .route('/admin/story/:id')
  .get(authController.ensureAuthenticated, viewController.getStoryEditPage)
  .patch(authController.ensureAuthenticated, viewController.editStory)
  .delete(authController.ensureAuthenticated, viewController.deleteStory);
router
  .route('/admin/cloudinary')
  .get(
    authController.ensureAuthenticated,
    viewController.getCloudinaryUploadPage
  );
module.exports = router;
