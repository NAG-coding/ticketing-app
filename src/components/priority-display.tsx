import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  priority: number;
}

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 1:
      return 'text-blue-400';
    case 2:
      return 'text-yellow-400';
    case 3:
      return 'text-red-400';
  }
};

const getPriorityText = (priority: number) => {
  switch (priority) {
    case 1:
      return 'Low';
    case 2:
      return 'Medium';
    case 3:
      return 'High';
  }
};

export const PriorityDisplay = ({ priority }: Props) => {
  return (
    <div className='flex align-baseline'>
      <p className={`${getPriorityColor(priority)} font-bold`}>{getPriorityText(priority)}</p>
    </div>
  );
};
