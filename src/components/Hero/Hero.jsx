import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">Camper rentals, done simply</p>
          <h1 className="hero__title">
            Find your <span>perfect</span> camper for the road ahead
          </h1>
          <p className="hero__sub">
            Browse a curated fleet of vans, alcoves, and fully integrated motorhomes.
            Filter by what matters, book in minutes, and go.
          </p>
          <button className="btn btn-primary hero__cta" onClick={() => navigate('/catalog')}>
            View Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="hero__scene" aria-hidden="true">
          <svg viewBox="0 0 480 320" className="hero__route-svg">
            <path
              className="hero__route-line"
              d="M-10 250 C 80 230, 120 270, 200 240 S 320 190, 400 220 S 470 260, 500 235"
              fill="none"
              stroke="var(--color-sage)"
              strokeWidth="3"
              strokeDasharray="2 14"
              strokeLinecap="round"
            />
            {/* Van silhouette */}
            <g transform="translate(150,150)">
              <rect x="0" y="40" width="150" height="55" rx="10" fill="var(--color-accent)" />
              <path d="M150 40 h35 a10 10 0 0 1 10 10 v35 h-45 z" fill="var(--color-accent-dark)" />
              <rect x="14" y="55" width="34" height="24" rx="3" fill="var(--color-bg)" opacity="0.85" />
              <rect x="58" y="55" width="34" height="24" rx="3" fill="var(--color-bg)" opacity="0.85" />
              <rect x="160" y="55" width="20" height="18" rx="3" fill="var(--color-bg)" opacity="0.85" />
              <circle cx="35" cy="98" r="16" fill="var(--color-ink)" />
              <circle cx="35" cy="98" r="6" fill="var(--color-bg)" />
              <circle cx="155" cy="98" r="16" fill="var(--color-ink)" />
              <circle cx="155" cy="98" r="6" fill="var(--color-bg)" />
            </g>
            {/* Sun */}
            <circle cx="400" cy="70" r="34" fill="var(--color-accent)" opacity="0.18" />
            <circle cx="400" cy="70" r="20" fill="var(--color-accent)" opacity="0.35" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
