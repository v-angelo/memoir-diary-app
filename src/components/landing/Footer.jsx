import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-20 border-t border-(--text-secondary)/15">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div>
          <h3 className="text-xl font-bold text-(--accent)">Memoir</h3>

          <p className="text-sm text-(--text-secondary)">
            Capture memories. Reflect deeply.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-(--text-secondary)">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <p className="text-sm text-(--text-secondary)">
          © {new Date().getFullYear()} Memoir
        </p>
      </div>
    </footer>
  );
}

export default Footer;
