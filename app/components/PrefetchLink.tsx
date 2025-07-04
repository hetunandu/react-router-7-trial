// PrefetchLink.tsx
import { Link } from 'react-router';
import router from '../routes'; // your router instance

export function PrefetchLink({ to, children, ...props }: { to: string, children: React.ReactNode, [key: string]: any }) {
  const handleMouseEnter = () => {
    router.loadRoute(to).catch((err) => {
      // ignore 404 or errors
      console.error("Prefetch failed:", err);
    });
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter} {...props}>
      {children}
    </Link>
  );
}
