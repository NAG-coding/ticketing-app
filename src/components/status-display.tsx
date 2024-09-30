import { TicketStatus } from '@/types/ticket';

interface Props {
  status: TicketStatus;
}

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.NotStarted:
      return 'bg-red-200';
    case TicketStatus.InProgress:
      return 'bg-yellow-200';
    case TicketStatus.Completed:
      return 'bg-green-200';
  }
};

export const StatusDisplay = ({ status }: Props) => {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getStatusColor(
        status
      )}`}>
      {status}
    </span>
  );
};
