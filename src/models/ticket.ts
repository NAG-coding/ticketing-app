import mongoose, { Schema } from 'mongoose';

const connectionURI = process.env.MONGODB_URI || '';

mongoose.connect(connectionURI);
mongoose.Promise = global.Promise;

const TicketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    status: String,
    progress: Number,
    active: Boolean,
  },
  { timestamps: true }
);

export const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
