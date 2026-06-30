import './ReviewList.css';

const Star = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? 'var(--color-accent)' : 'none'} aria-hidden="true">
    <path
      d="M8 0l2.4 5.1L16 5.7l-4 4.6L13.1 16 8 12.9 2.9 16l1.1-5.7-4-4.6 5.6-.6z"
      stroke={filled ? 'none' : 'var(--color-border)'}
      strokeWidth="1"
    />
  </svg>
);

const ReviewStars = ({ rating }) => (
  <div className="review-stars" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} filled={i <= Math.round(rating)} />)}
  </div>
);

const ReviewList = ({ reviews = [] }) => {
  if (!reviews.length) {
    return <p className="review-list__empty">No reviews yet for this camper.</p>;
  }

  return (
    <ul className="review-list">
      {reviews.map((review, i) => (
        <li className="review-item" key={`${review.reviewer_name}-${i}`}>
          <div className="review-item__avatar" aria-hidden="true">
            {review.reviewer_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="review-item__body">
            <div className="review-item__top">
              <span className="review-item__name">{review.reviewer_name}</span>
              <ReviewStars rating={review.reviewer_rating} />
            </div>
            <p className="review-item__text">{review.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { ReviewStars };
export default ReviewList;
