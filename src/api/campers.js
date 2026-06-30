import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

/**
 * Fetch a page of campers, optionally filtered.
 * mockapi.io supports `page` & `limit` for pagination and arbitrary
 * field equality filters (e.g. ?location=Kyiv, ?form=alcove).
 */
export const fetchCampers = async (params = {}) => {
  const { data } = await api.get('/campers', { params });
  return {
    items: Array.isArray(data.items) ? data.items : data,
    totalCount: data.total || (Array.isArray(data) ? data.length : 0),
  };
};

export const fetchCamperById = async (id) => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
};
