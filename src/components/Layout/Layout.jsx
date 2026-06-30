import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink to="/" className="brand" aria-label="TravelTrucks home">
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
              <path d="M1 14V5a1 1 0 0 1 1-1h11l4 4h7a1 1 0 0 1 1 1v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="7" cy="15.5" r="2.2" fill="currentColor" />
              <circle cx="20" cy="15.5" r="2.2" fill="currentColor" />
            </svg>
            <span>TravelTrucks</span>
          </NavLink>
          <nav className="main-nav" aria-label="Primary">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'is-active' : ''}>Home</NavLink>
            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'is-active' : ''}>Catalog</NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>&copy; {new Date().getFullYear()} TravelTrucks. Camper rentals for the open road.</p>
        </div>
      </footer>

      <ToastContainer position="top-center" autoClose={3500} hideProgressBar />
    </div>
  );
};

export default Layout;
