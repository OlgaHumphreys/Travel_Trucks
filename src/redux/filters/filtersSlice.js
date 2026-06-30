import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  form: '', // vehicle type: panelTruck | fullyIntegrated | alcove
  equipment: {
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action) {
      // selecting the same type again clears it
      state.form = state.form === action.payload ? '' : action.payload;
    },
    toggleEquipment(state, action) {
      const key = action.payload;
      state.equipment[key] = !state.equipment[key];
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setForm, toggleEquipment, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
