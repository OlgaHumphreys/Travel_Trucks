import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import { formatPrice, FORM_LABELS } from '../../utils/helpers';
import './CamperCard.css';

const FEATURE_ICONS = {
  AC: 'AC',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  TV: 'TV',
  radio: 'Radio',
  refrigerator: 'Fridge',
  microwave: 'Microwave',
  gas: 'Gas',
  water: 'Water',
  transmission: 'Automatic',
  engine: 'Petrol',
};

const CamperCard = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(camper.id);

  const featureTags = Object.keys(FEATURE_ICONS).filter((key) => {
    if (key === 'transmission') return camper.transmission === 'automatic';
    if (key === 'engine') return Boolean(camper.engine);
    return Boolean(camper[key]);
  });

  return (
    <article className="camper-card" onClick={() => navigate(`/catalog/${camper.id}`)}>
      <img
        className="camper-card__image"
        src={camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original}
        alt={camper.name}
        loading="lazy"
      />

      <div className="camper-card__body">
        <div className="camper-card__top">
          <h3 className="camper-card__name">{camper.name}</h3>
          <div className="camper-card__price-fav">
            <span className="camper-card__price">&euro;{formatPrice(camper.price)}</span>
            <button
              className={`camper-card__fav ${isFavorite ? 'is-active' : ''}`}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(camper.id)); }}
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill={isFavorite ? 'currentColor' : 'none'}>
                <path d="M10 17 1.6 9.3C-1 6.9.6 2 5 2c2 0 3.8 1.1 5 2.8C11.2 3.1 13 2 15 2c4.4 0 6 4.9 3.4 7.3L10 17Z" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="camper-card__meta">
          <span className="camper-card__rating">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--color-accent)" aria-hidden="true">
              <path d="M7 0l2.1 4.5L14 5l-3.5 3.3L11.3 14 7 11.3 2.7 14l.8-5.7L0 5l4.9-.5z" />
            </svg>
            {camper.rating} ({camper.reviews?.length ?? 0} Reviews)
          </span>
          <span className="camper-card__location">{camper.location}</span>
        </div>

        <p className="camper-card__description">{camper.description}</p>

        <ul className="camper-card__tags">
          <li className="tag">{FORM_LABELS[camper.form] || camper.form}</li>
          {featureTags.map((key) => (
            <li className="tag" key={key}>{FEATURE_ICONS[key]}</li>
          ))}
        </ul>

      </div>
    </article>
  );
};

export default CamperCard;
