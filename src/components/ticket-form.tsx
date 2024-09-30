'use client';

import { Input } from '@/types/input';
import { Ticket, TicketStatus } from '@/types/ticket';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Fragment, useMemo, useState } from 'react';

const inputs = [
  {
    id: 'title',
    type: 'text',
    label: 'Title',
    placeholder: 'Enter title',
  },
  {
    id: 'description',
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter description',
  },
  {
    id: 'category',
    type: 'select',
    label: 'Category',
    options: [
      {
        label: 'Select a category',
        disabled: true,
        value: '',
      },
      {
        value: 'frontend',
        label: 'Frontend',
      },
      {
        value: 'backend',
        label: 'Backend',
      },
    ],
  },
  {
    id: 'priority',
    type: 'select',
    label: 'Priority',
    options: [
      {
        label: 'Select a priority',
        disabled: true,
        value: '',
      },
      {
        value: 1,
        label: 'Low',
      },
      {
        value: 2,
        label: 'Medium',
      },
      {
        value: 3,
        label: 'High',
      },
    ],
  },
  {
    id: 'status',
    type: 'select',
    label: 'Status',
    options: [
      {
        label: 'Select a status',
        disabled: true,
        value: '',
      },
      {
        value: TicketStatus.NotStarted,
        label: 'Not started',
      },
      {
        value: TicketStatus.InProgress,
        label: 'In progress',
      },
      {
        value: TicketStatus.Completed,
        label: 'Completed',
      },
    ],
  },
];

interface Props {
  ticket: Ticket | null | undefined;
}

export const TicketForm = ({ ticket }: Props) => {
  const router = useRouter();

  const initialFormData = useMemo(
    () => ({
      title: ticket?.title || '',
      description: ticket?.description || '',
      priority: ticket?.priority || 0,
      progress: ticket?.progress || 0,
      status: ticket?.status || '',
      category: ticket?.category || '',
    }),
    [ticket]
  );

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ticket) {
      const res = await fetch(`/api/tickets/${ticket._id}`, {
        method: 'PUT',
        body: JSON.stringify({ formData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to update ticket.');
      }
    } else {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ formData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to create ticket.');
      }
    }

    router.refresh();
    setTimeout(() => router.push('/'), 1000);
  };

  const renderInput = ({ id, placeholder, type, options }: Omit<Input, 'label'>) => {
    const values = formData as Record<string, string | number>;

    switch (type) {
      case 'textarea':
        return (
          <textarea
            placeholder={placeholder}
            id={id}
            name={id}
            onChange={handleChange}
            required
            value={values[id]}
            rows={5}
          />
        );
      case 'select':
        return (
          <select id={id} name={id} onChange={handleChange} required value={values[id]}>
            {options?.map(({ value, label, ...rest }, i) => (
              <option key={i} value={value} {...rest}>
                {label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            name={id}
            onChange={handleChange}
            required
            value={values[id]}
          />
        );
    }
  };

  return (
    <div className='flex justify-center'>
      <form className='flex flex-col gap-3 w-full lg:w-1/2' onSubmit={handleSubmit}>
        <h3>{ticket ? 'Update' : 'Create'} your ticket</h3>

        {inputs.map(({ id, label, ...rest }) => (
          <Fragment key={id}>
            <label htmlFor={id}>{label}</label>
            {renderInput({ id, ...rest })}
          </Fragment>
        ))}

        <button className='btn' type='submit'>
          {ticket ? 'Update' : 'Create'} ticket
        </button>
      </form>
    </div>
  );
};
