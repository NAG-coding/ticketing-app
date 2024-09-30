import { faHome, faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const navItems = [
  {
    href: '/',
    icon: faHome,
  },
  {
    href: '/ticket/new',
    icon: faTicket,
  },
];

export const Nav = () => {
  return (
    <nav className='flex justify-between bg-nav p-4'>
      <div className='flex items-center space-x-4'>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <FontAwesomeIcon icon={item.icon} className='icon' />
          </Link>
        ))}
      </div>
      <div>
        <p className='text-default-text'>Neil@gmail.com</p>
      </div>
    </nav>
  );
};
