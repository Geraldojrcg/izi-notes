import Link from "next/link";

export function MenuMobileButton() {
  return (
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 text-sm text-slate-600 rounded-lg md:hidden bg-slate-500 hover:bg-slate-400 focus:outline-none"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

function Menu() {
  return (
    <nav>
      <div className="flex w-full max-sm:h-fit md:w-52 h-screen bg-slate-500 shadow-xl shadow-slate-600 rounded-md p-4">
        <ul className="flex flex-col gap-4">
          <li data-collapse-toggle="navbar-default">
            <Link href="/" className="text-white">
              🏠 Home
            </Link>
          </li>
          <li data-collapse-toggle="navbar-default">
            <Link href="/notes" className="text-white">
              🗒️ My Notes
            </Link>
          </li>
          <li data-collapse-toggle="navbar-default">
            <Link href="/note-editor" className="text-white">
              📝 New Note
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
