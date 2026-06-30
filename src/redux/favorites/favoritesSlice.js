import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'travelTrucks.favorites';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently
  }
};

const initialState = {
  ids: loadFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter((favId) => favId !== id)
        : [...state.ids, id];
      saveToStorage(state.ids);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
