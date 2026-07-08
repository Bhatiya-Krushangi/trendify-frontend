import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="max-w-lg mx-auto py-24 text-center">
    <p className="text-brand-600 font-display font-bold text-6xl mb-4">404</p>
    <h1 className="text-2xl font-bold mb-2 text-ink dark:text-white">Page not found</h1>
    <p className="text-slate-500 dark:text-slate-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
    <Link to="/" className="inline-block bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-md text-sm font-medium">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
