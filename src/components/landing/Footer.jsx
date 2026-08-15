import { Link } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi";

function Footer() {
  return (
    <footer className="mt-16 border-t border-(--text-secondary)/10">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div>
            <Link to={"/"} className="text-2xl font-bold tracking-tight">
              <div className="flex items-center justify-start gap-2">
                <img className="h-10" src="/memoirLogo.png" alt="Logo" />
                <span>Memoir</span>
              </div>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-(--text-secondary)">
              A private space to capture memories, reflect on experiences, and
              preserve moments that matter.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">
            <Link
              to="/login"
              className="transition-colors hover:text-(--accent)"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="transition-colors hover:text-(--accent)"
            >
              Register
            </Link>

            <a
              href="#features"
              className="transition-colors hover:text-(--accent)"
            >
              Features
            </a>

            <a
              href="#testimonials"
              className="transition-colors hover:text-(--accent)"
            >
              Testimonials
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-(--text-secondary)/10 pt-6 text-sm text-(--text-secondary) md:flex-row">
          <p>© {new Date().getFullYear()} Memoir. All rights reserved.</p>

          <p>Built with ❤️ using MongoDB, Express, React & NodeJS.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
