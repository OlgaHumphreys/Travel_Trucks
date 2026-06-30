import { useState } from 'react';
import { toast } from 'react-toastify';
import './BookingForm.css';

const initialForm = { name: '', email: '', date: '', comment: '' };

const BookingForm = ({ camperName }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!form.email.trim()) {
      next.email = 'Enter your email.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.date) next.date = 'Choose a booking date.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // No booking backend is provided by the spec — this simulates the
    // request and confirms success, matching the "display a success
    // notification" requirement.
    toast.success(`Booking request sent for ${camperName}. We'll be in touch shortly!`);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <h3 className="booking-form__title">Book your camper now</h3>
      <p className="booking-form__sub">Stay connected! We are always ready to help you.</p>

      <div className="booking-form__field">
        <label htmlFor="booking-name">Name*</label>
        <input
          id="booking-name"
          type="text"
          value={form.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'booking-name-error' : undefined}
        />
        {errors.name && <span className="booking-form__error" id="booking-name-error">{errors.name}</span>}
      </div>

      <div className="booking-form__field">
        <label htmlFor="booking-email">Email*</label>
        <input
          id="booking-email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'booking-email-error' : undefined}
        />
        {errors.email && <span className="booking-form__error" id="booking-email-error">{errors.email}</span>}
      </div>

      <div className="booking-form__field">
        <label htmlFor="booking-date">Booking date*</label>
        <input
          id="booking-date"
          type="date"
          value={form.date}
          onChange={handleChange('date')}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? 'booking-date-error' : undefined}
        />
        {errors.date && <span className="booking-form__error" id="booking-date-error">{errors.date}</span>}
      </div>

      <div className="booking-form__field">
        <label htmlFor="booking-comment">Comment</label>
        <textarea
          id="booking-comment"
          rows={4}
          value={form.comment}
          onChange={handleChange('comment')}
        />
      </div>

      <button type="submit" className="btn btn-primary booking-form__submit">
        Send
      </button>
    </form>
  );
};

export default BookingForm;
