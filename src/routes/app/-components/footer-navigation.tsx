import { Link } from '@tanstack/react-router'
import { Activity, Home, Sword, User, Users } from 'lucide-react'
import Logo from '@/logo.svg'
import { useUser } from '@/hooks/user'
import UserAvatar from '@/components/user-avatar'

const Navigation = () => {
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
      name: 'Profile',
      Icon: User,
      to: '/app/profile',
    },
  ]
  const user = useUser()

  return (
    <>
      {/* Desktop Sidebar - Collapsible on hover */}
      <nav className="hidden lg:block fixed left-0 top-0 z-20 h-full bg-background/80 backdrop-blur-md border-r border-border/50 group">
        <div className="w-20 group-hover:w-64 transition-all duration-300 ease-in-out h-full flex flex-col bg-sidebar overflow-hidden">
          {/* Logo/Brand Section */}
          <div className="h-[65px] px-4 flex items-center">
            <img className="size-12 object-cover" src={Logo} alt="Logo" />
            <span className="text-xl font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Mathlify
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-4 space-y-2">
            {links.map(({ name, Icon, to }) => (
              <Link
                key={name}
                to={to}
                className="flex items-center gap-3 pl-3 px-4 py-3 rounded-xl text-muted-foreground transition-all duration-200"
                activeOptions={{ exact: true, includeSearch: false }}
                activeProps={{
                  className:
                    'text-primary bg-primary/10 border border-primary/20',
                }}
              >
                <Icon className="size-5 duration-200 flex-shrink-0" />
                <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {name}
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom Section - User Info */}
          <div className="p-4">
            <div className="flex items-center gap-3 px-2">
              <UserAvatar
                avatar={user.avatar}
                username={user.username}
                className="size-8"
              />
              <div className="flex-1 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Footer Navigation */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-md border-t border-border/50">
        <div className="flex justify-around items-center">
          {links.map(({ name, Icon, to }) => (
            <Link
              key={name}
              to={to}
              className="flex flex-col items-center h-full py-4 px-2 transition-colors duration-200"
              activeOptions={{ exact: true, includeSearch: false }}
              activeProps={{
                className: 'text-primary',
              }}
            >
              <Icon className="size-5 mb-1" />
            </Link>
          ))}
        </div>
      </footer>
    </>
  )
}

export default Navigation
