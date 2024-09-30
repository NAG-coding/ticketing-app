import { Ticket } from '@/types/ticket';
import { DeleteBlock } from './delete-block';
import { PriorityDisplay } from './priority-display';
import { ProgressDisplay } from './progress-display';
import { StatusDisplay } from './status-display';
import Link from 'next/link';

interface Props {
  ticket: Ticket;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const TicketCard = ({ ticket }: Props) => {
  return (
    <div className='flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2'>
      <div className='flex justify-between mb-3'>
        <PriorityDisplay priority={ticket.priority} />
        <DeleteBlock id={ticket._id} />
      </div>
      <Link href={`/ticket/${ticket._id}`}>
        <h4>{ticket.title}</h4>
        <hr className='h-px border-0 bg-page mb-2' />
        <p className='whitespace-pre-wrap '>{ticket.description}</p>
        <div className='flex-grow'></div>
        <div className='flex justify-between items-center mt-2'>
          <div className='flex flex-col'>
            <p className='text-xs my-1'>{formatDate(ticket.createdAt)}</p>
            <ProgressDisplay />
          </div>
          <StatusDisplay status={ticket.status} />
        </div>
      </Link>
    </div>
  );
};
