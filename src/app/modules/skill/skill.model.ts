import { Schema, model } from 'mongoose';
import { ISkill } from './skill.interface';

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
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

const Skill = model<ISkill>('Skill', skillSchema);

export default Skill;
