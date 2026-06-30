import { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images = [], name }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return <div className="gallery gallery--empty">No photos available for this camper.</div>;
  }

  const active = images[activeIndex];

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img src={active.original || active.thumb} alt={`${name} photo ${activeIndex + 1}`} />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((img, i) => (
            <button
              key={img.original || i}
              className={`gallery__thumb ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-pressed={i === activeIndex}
            >
              <img src={img.thumb || img.original} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
