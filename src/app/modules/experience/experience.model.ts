import { Schema, model } from 'mongoose';
import { monthList } from './experience.constant';
import { IExperience } from './experience.interface';

const experienceSchema = new Schema<IExperience>(
  {
    companyName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      enum: monthList,
      required: true,
    },
    endTime: {
      type: Date,
    },
    isWorkingCurrently: {
      type: Boolean,
      required: true,
      default: false,
    },
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
      },
    ],
    description: {
      type: String,
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

const Experience = model<IExperience>('Experience', experienceSchema);

export default Experience;
