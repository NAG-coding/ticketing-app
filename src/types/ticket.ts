export interface Ticket {
  title: string;
  description: string;
  category: string;
  priority: number;
  status: TicketStatus;
  progress: number;
  active: boolean;
  createdAt: Date;
  _id: string;
}

export enum TicketStatus {
  NotStarted = 'Not started',
  InProgress = 'In progress',
  Completed = 'Completed',
}
