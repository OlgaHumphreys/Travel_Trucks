import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setForm, toggleEquipment } from '../../redux/filters/filtersSlice';
import { clearCampers, loadCampers } from '../../redux/campers/campersSlice';
import { EQUIPMENT_OPTIONS, VEHICLE_TYPES } from '../../utils/helpers';
import './FilterBar.css';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleSearch = (e) => {
    e.preventDefault();
    // Clear previously loaded results before requesting filtered data
    dispatch(clearCampers());
    dispatch(loadCampers({ filters, page: 1 }));
  };

  return (
    <form className="filter-bar" onSubmit={handleSearch}>
      <div className="filter-group">
        <label htmlFor="location" className="filter-label">Location</label>
        <div className="filter-input-wrap">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 14.5S13 10 13 6.2A5 5 0 0 0 3 6.2C3 10 8 14.5 8 14.5Z" stroke="var(--color-sage)" strokeWidth="1.4" />
            <circle cx="8" cy="6.2" r="1.8" stroke="var(--color-sage)" strokeWidth="1.4" />
          </svg>
          <input
            id="location"
            type="text"
            placeholder="City"
            value={filters.location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
          />
        </div>
      </div>

      <fieldset className="filter-group">
        <legend className="filter-label">Vehicle type</legend>
        <div className="filter-options">
          {VEHICLE_TYPES.map(({ key, label }) => (
            <button
              type="button"
              key={key}
              className={`filter-chip ${filters.form === key ? 'is-active' : ''}`}
              aria-pressed={filters.form === key}
              onClick={() => dispatch(setForm(key))}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-label">Equipment</legend>
        <div className="filter-options">
          {EQUIPMENT_OPTIONS.map(({ key, label }) => (
            <button
              type="button"
              key={key}
              className={`filter-chip ${filters.equipment[key] ? 'is-active' : ''}`}
              aria-pressed={filters.equipment[key]}
              onClick={() => dispatch(toggleEquipment(key))}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="btn btn-primary filter-bar__submit">
        Search
      </button>
    </form>
  );
};

export default FilterBar;
