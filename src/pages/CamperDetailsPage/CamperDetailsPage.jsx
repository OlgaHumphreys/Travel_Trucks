import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from '../../components/Gallery/Gallery';
import ReviewList, { ReviewStars } from '../../components/ReviewList/ReviewList';
import BookingForm from '../../components/BookingForm/BookingForm';
import Loader from '../../components/Loader/Loader';
import { loadCamperDetails, clearDetails } from '../../redux/campers/campersSlice';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';
import { formatPrice, FORM_LABELS, EQUIPMENT_OPTIONS } from '../../utils/helpers';
import './CamperDetailsPage.css';

const SPEC_FIELDS = [
  { key: 'form', label: 'Form', transform: (v) => FORM_LABELS[v] || v },
  { key: 'length', label: 'Length' },
  { key: 'width', label: 'Width' },
  { key: 'height', label: 'Height' },
  { key: 'tank', label: 'Tank' },
  { key: 'consumption', label: 'Consumption' },
];

const CamperDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details, detailsStatus, detailsError } = useSelector((state) => state.campers);
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    dispatch(loadCamperDetails(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [id, dispatch]);

  if (detailsStatus === 'loading' || detailsStatus === 'idle') {
    return <Loader label="Loading camper details…" />;
  }

  if (detailsStatus === 'failed') {
    return (
      <div className="container details-error">
        <p>Couldn&apos;t load this camper: {detailsError}</p>
      </div>
    );
  }

  if (!details) return null;

  const isFavorite = favoriteIds.includes(details.id);
  const availableEquipment = EQUIPMENT_OPTIONS.filter(({ key }) => Boolean(details[key]));

  return (
    <section className="details container">
      <button className="details__back" onClick={() => navigate(-1)} aria-label="Go back">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12.5 16L7 10l5.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      <div className="details__header">
        <h1 className="details__name">{details.name}</h1>
        <div className="details__meta">
          <span className="details__rating">
            <ReviewStars rating={details.rating} />
            {details.rating} ({details.reviews?.length ?? 0} Reviews)
          </span>
          <span className="details__location">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 14.5S13 10 13 6.2A5 5 0 0 0 3 6.2C3 10 8 14.5 8 14.5Z" stroke="var(--color-sage)" strokeWidth="1.4" />
              <circle cx="8" cy="6.2" r="1.8" stroke="var(--color-sage)" strokeWidth="1.4" />
            </svg>
            {details.location}
          </span>
        </div>
        <div className="details__price-row">
          <span className="details__price">&euro;{formatPrice(details.price)}</span>
          <button
            className={`btn btn-secondary details__fav ${isFavorite ? 'is-active' : ''}`}
            aria-pressed={isFavorite}
            onClick={() => dispatch(toggleFavorite(details.id))}
          >
            <svg width="18" height="16" viewBox="0 0 20 18" fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true">
              <path d="M10 17 1.6 9.3C-1 6.9.6 2 5 2c2 0 3.8 1.1 5 2.8C11.2 3.1 13 2 15 2c4.4 0 6 4.9 3.4 7.3L10 17Z" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {isFavorite ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <Gallery images={details.gallery} name={details.name} />

      <p className="details__description">{details.description}</p>

      <div className="details__tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'features'}
          className={activeTab === 'features' ? 'is-active' : ''}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'reviews'}
          className={activeTab === 'reviews' ? 'is-active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className="details__grid">
        <div className="details__panel">
          {activeTab === 'features' ? (
            <>
              {availableEquipment.length > 0 && (
                <ul className="details__equipment">
                  {availableEquipment.map(({ key, label }) => (
                    <li key={key}>{label}</li>
                  ))}
                  {details.transmission === 'automatic' && <li>Automatic</li>}
                  {details.engine && <li>{details.engine}</li>}
                </ul>
              )}

              <table className="details__specs">
                <tbody>
                  {SPEC_FIELDS.map(({ key, label, transform }) => (
                    details[key] !== undefined && details[key] !== '' && (
                      <tr key={key}>
                        <th scope="row">{label}</th>
                        <td>{transform ? transform(details[key]) : details[key]}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <ReviewList reviews={details.reviews} />
          )}
        </div>

        <div className="details__booking">
          <BookingForm camperName={details.name} />
        </div>
      </div>
    </section>
  );
};

export default CamperDetailsPage;
