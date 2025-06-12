import { Link } from '@tanstack/react-router'
import { Activity, Home, Sword, User, Users } from 'lucide-react'

const FooterNavigation = () => {
  const links = [
    {
      name: 'Home',
      Icon: Home,
      to: '/app',
    },
    {
      name: 'Competition',
      Icon: Sword,
      to: '/app/competition',
    },
    {
      name: 'Online',
      Icon: Users,
      to: '/app/online',
    },
    {
      name: 'Practice',
      Icon: Activity,
      to: '/app/practice',
    },
    {
      name: 'More',
      Icon: User,
      to: '/app/profile',
    },
  ]
  return (
    <footer className="z-10 bg-background backdrop-blur-md border-t border-border">
      <div className="flex justify-around items-center">
        {links.map(({ name, Icon, to }) => (
          <Link
            key={name}
            to={to}
            className="flex flex-col items-center h-full py-6"
            activeOptions={{ exact: true }}
            activeProps={{
                className: "text-primary"
            }}
          >
            <Icon className="size-5" />
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default FooterNavigation
