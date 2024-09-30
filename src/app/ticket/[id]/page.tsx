import { TicketForm } from '@/components/ticket-form';
import { Ticket as TicketType } from '@/types/ticket';

interface Props {
  params: {
    id: string;
  };
}

const getTicketById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topic');
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Ticket = async ({ params }: Props) => {
  const EDIT_MODE = params.id !== 'new';
  let updateTicketData: TicketType | null | undefined = null;

  if (EDIT_MODE) {
    const ticket = await getTicketById(params.id);
    updateTicketData = ticket.foundTicket;
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default Ticket;
