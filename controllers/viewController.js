const AppError = require('../util/AppError');
const catchAsync = require('../util/CatchAsync');
const Story = require('../models/storyModel');
const Feature = require('../util/Features');

exports.getIndex = catchAsync(async (req, res, next) => {
  const featuredStories = await Story.find({ featured: true })
    .sort('-createdAt')
    .limit(10);
  //console.log(featuredStories);
  res.status(200).render('index', {
    featuredStories,
  });
});

exports.getAllStories = catchAsync(async (req, res, next) => {
  const determinestories = await Story.find();
  let No;
  if (req.query.page == undefined) {
    No = 1;
  } else {
    No = parseInt(req.query.page);
  }
  const features = new Feature(Story.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const stories = await features.query;
  const limit = 20;
  const pages = Math.ceil(determinestories.length / limit);
  res.status(200).render('allstories', {
    stories,
    pages,
    No,
  });
});

exports.getSingleStory = catchAsync(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  res.status(200).render('singlestory', {
    story,
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  res.status(200).render('contact');
});

exports.getAbout = catchAsync(async (req, res, next) => {
  res.status(200).render('about');
});

exports.getAdminHome = catchAsync(async (req, res, next) => {
  const stories = await Story.find().sort('-createdAt');
  res.status(200).render('admin/adminHome', {
    stories,
  });
});

exports.createStoryPage = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/uploadStory');
});

exports.createStory = catchAsync(async (req, res, next) => {
  let featured;
  if (req.body.featured == 'on') {
    featured = true;
  } else {
    featured = false;
  }
  const newStory = await Story.create({
    owner: req.body.owner,
    image: req.body.image,
    story: req.body.story,
    featured: featured,
  });
  console.log('owner', typeof req.body.featured);
  res.status(200).redirect('/admin/dashboard');
});
exports.getStoryEditPage = catchAsync(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  res.status(200).render('admin/editStory', {
    story,
  });
});

exports.editStory = catchAsync(async (req, res, next) => {
  let featured;
  if (req.body.featured == 'on') {
    featured = true;
  } else {
    featured = false;
  }
  const story = await Story.findByIdAndUpdate(
    req.params.id,
    {
      owner: req.body.owner,
      image: req.body.image,
      story: req.body.story,
      featured: featured,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  req.flash('success_msg', 'Story successfully updated');
  res.status(200).redirect('/admin/dashboard');
});
exports.deleteStory = catchAsync(async (req, res, next) => {
  const story = await Story.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Story deleted');
  res.status(200).redirect('/admin/dashboard');
});

exports.getCloudinaryUploadPage = catchAsync(async (req, res, next) => {
  res.status(200).render('admin/cloudinaryUploadPage');
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render('login');
});
