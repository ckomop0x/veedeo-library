import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function Nav() {
  return (
    <header
      className="sticky top-0 w-full shadow-md z-50 border-b border-indigo-300 bg-indigo-200
              dark:border-indigo-900 dark:bg-indigo-950"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-2">
        <Link href="/" className="text-xl font-bold uppercase">
          Veedeo Library
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
