import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div>
      <nav
        className="px-4 text-white bg-indigo-700 w-full
      ">
        <ul className="flex">
          <li className="inline-block py-2 px-4">
            <Link to="/" className="text-white text-5xl">
              Code Journal
            </Link>
          </li>
          <li className="inline-block py-2 px-4 mt-4">
            <Link to="/entries" className="text-white text-xl">
              Entries
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
