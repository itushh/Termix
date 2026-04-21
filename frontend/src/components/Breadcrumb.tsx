import { Link } from "react-router-dom";

export default function Breadcrumb() {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">

        {/* Home */}
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
          >
            <svg
              className="w-4 h-4 me-1.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
              />
            </svg>
            Home
          </Link>
        </li>

        {/* Analyze */}
        <li>
          <div className="flex items-center space-x-1.5">
            <svg
              className="w-3.5 h-3.5 rtl:rotate-180 text-body"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>

            <Link
              to="/analyze"
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
            >
              Analyze
            </Link>
          </div>
        </li>

        {/* Xyz Insurance */}
        <li aria-current="page">
          <div className="flex items-center space-x-1.5">
            <svg
              className="w-3.5 h-3.5 rtl:rotate-180 text-body"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>

            <span className="inline-flex items-center text-sm font-medium text-body-subtle">
              Xyz Insurance
            </span>
          </div>
        </li>

      </ol>
    </nav>
  );
}