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
    startMonth: {
      type: String,
      enum: monthList,
      required: true,
    },
    startYear: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      enum: monthList,
    },
    endYear: {
      type: String,
    },
    isWorkingCurrently: {
      type: Boolean,
      required: true,
      default: false,
    },
    show: {
      type: Boolean,
      required: true,
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
      },
    ],
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
