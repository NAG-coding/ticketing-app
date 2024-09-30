import { TicketCard } from '@/components/ticket-card';
import { Ticket } from '@/types/ticket';

const getTickets = async () => {
  try {
    const result = await fetch('http://localhost:3000/api/tickets', {
      cache: 'no-cache',
    });

    return await result.json();
  } catch (error) {
    console.error('Failed to get the tickets:', error);
  }
};

const sortTicketsByCategory = (tickets: Ticket[]) => {
  return tickets.reduce((acc: Record<string, Ticket[]>, ticket: Ticket) => {
    const { category } = ticket;
    const categoryStore = acc[category];
    if (!categoryStore) {
      acc[category] = [];
    }

    acc[category].push(ticket);

    return acc;
  }, {});
};

const Dashboard = async () => {
  const { tickets } = (await getTickets()) || {};
  const sortedTickets = sortTicketsByCategory(tickets);

  return (
    <div className='p-5'>
      {Object.entries(sortedTickets).map(([category, tickets]) => (
        <div key={category} className='mb-4'>
          <h2 className='capitalize'>{category}</h2>
          <div className='lg:grid grid-cols-2 xl:grid-cols-4'>
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
