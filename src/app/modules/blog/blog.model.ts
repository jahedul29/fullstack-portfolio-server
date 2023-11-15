import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    blogUrl: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    priorityScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;
