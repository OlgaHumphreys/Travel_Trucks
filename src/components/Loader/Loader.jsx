import './Loader.css';

const Loader = ({ label = 'Loading campers…' }) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <svg className="loader__spinner" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="16" stroke="var(--color-border)" strokeWidth="4" />
        <path d="M20 4a16 16 0 0 1 16 16" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="loader__label">{label}</span>
    </div>
  );
};

export default Loader;
