const mongoose = require('mongoose');
const slugify = require('slugify');
const StorySchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, 'please enter the owner name'],
    },
    slug: String,
    story: {
      type: String,
      required: [true, 'Please enter the story '],
    },
    image: {
      type: String,
      required: [true, 'Please enter owner image'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// storySchema.pre('save', function (next) {
//   this.slug = slugify(`${this.owner}`, { lower: true });
//   next();
// });

const Story = mongoose.model('Story', StorySchema);
module.exports = Story;
