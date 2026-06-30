import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBar from '../../components/FilterBar/FilterBar';
import CamperCard from '../../components/CamperCard/CamperCard';
import Loader from '../../components/Loader/Loader';
import { loadCampers } from '../../redux/campers/campersSlice';
import { matchesEquipment } from '../../utils/helpers';
import './CatalogPage.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, totalCount, page, status, error } = useSelector((state) => state.campers);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadCampers({ filters, page: 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleCampers = useMemo(
    () => items.filter((camper) => matchesEquipment(camper, filters.equipment)),
    [items, filters.equipment]
  );

  const hasMore = items.length < totalCount;

  const handleLoadMore = () => {
    dispatch(loadCampers({ filters, page: page + 1 }));
  };

  return (
    <section className="catalog container">
      <aside className="catalog__sidebar">
        <FilterBar />
      </aside>

      <div className="catalog__results">
        {status === 'failed' && (
          <p className="catalog__error">Couldn&apos;t load campers: {error}</p>
        )}

        {status === 'loading' && items.length === 0 && <Loader />}

        {status !== 'loading' && status !== 'failed' && visibleCampers.length === 0 && (
          <p className="catalog__empty">
            No campers match your filters yet. Try adjusting your search.
          </p>
        )}

        <div className="catalog__grid">
          {visibleCampers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>

        {status === 'loading' && items.length > 0 && <Loader label="Loading more campers…" />}

        {hasMore && status !== 'loading' && (
          <button className="btn btn-secondary catalog__load-more" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;
