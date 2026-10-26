import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// One document holds all editable site content.
const configSchema = new Schema(
  { key: { type: String, default: 'site', unique: true }, data: { type: Schema.Types.Mixed, default: {} } },
  { timestamps: true }
);

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    pool: { type: String, enum: ['Both pools', 'Pool A', 'Pool B'], default: 'Both pools' },
    note: { type: String, trim: true, maxlength: 1000, default: '' },
    status: { type: String, enum: ['New', 'Contacted', 'Approved', 'Rejected'], default: 'New' },
  },
  { timestamps: true }
);
leadSchema.index({ createdAt: -1 });

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Config = model('Config', configSchema);
export const Lead = model('Lead', leadSchema);
export const Admin = model('Admin', adminSchema);
